import React, { useEffect, useRef, useState } from "react";
import { Camera, FileText, Loader2, Phone, Plus, Trash2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { createInvoicePdfFile, downloadInvoicePdf } from "@/lib/invoicePdf";

interface Product {
  id: string;
  name: string;
  model?: string;
  serialNumber?: string;
  color?: string;
  quantity: number;
  price: number;
  discount: number;
}

type NewProduct = Omit<Product, "id">;

interface BillData {
  customerName: string;
  customerPhone: string;
  products: Product[];
  invoiceNo: string;
  date: string;
}

interface ProductPhoto {
  id: string;
  file: File;
  previewUrl: string;
}

interface ExtractedProductDetails {
  productName: string;
  model: string;
  serialNumber: string;
  color: string;
  price: number | null;
}

const createEmptyProduct = (): NewProduct => ({
  name: "",
  model: "",
  serialNumber: "",
  color: "",
  quantity: 1,
  price: 0,
  discount: 0,
});

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

const normalizeWhatsAppPhone = (phone: string) => {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

export const Bills = () => {
  const [billData, setBillData] = useState<BillData>({
    customerName: "",
    customerPhone: "",
    products: [],
    invoiceNo: `INV${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().slice(0, 10),
  });
  const [newProduct, setNewProduct] = useState<NewProduct>(createEmptyProduct);
  const [productPhotos, setProductPhotos] = useState<ProductPhoto[]>([]);
  const [isExtractingDetails, setIsExtractingDetails] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [extractionStatus, setExtractionStatus] = useState("");
  const [shareWithCustomerDirectly, setShareWithCustomerDirectly] = useState(false);

  const productPhotosRef = useRef<ProductPhoto[]>([]);

  useEffect(() => {
    const handleOpenAddProduct = () => {
      document.getElementById("add-product-section")?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("openAddProduct", handleOpenAddProduct);
    return () => window.removeEventListener("openAddProduct", handleOpenAddProduct);
  }, []);

  useEffect(() => {
    productPhotosRef.current = productPhotos;
  }, [productPhotos]);

  useEffect(() => {
    return () => {
      productPhotosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, []);

  useEffect(() => {
    if (!isExtractingDetails) {
      setExtractionProgress(0);
      return;
    }

    setExtractionProgress(12);
    const progressSteps = [28, 46, 63, 78, 88, 94];
    let stepIndex = 0;
    const intervalId = window.setInterval(() => {
      setExtractionProgress((current) => {
        const nextStep = progressSteps[Math.min(stepIndex, progressSteps.length - 1)];
        stepIndex += 1;
        return Math.max(current, nextStep);
      });
    }, 650);

    return () => window.clearInterval(intervalId);
  }, [isExtractingDetails]);

  const calculateAmount = (product: Product) => {
    const itemTotal = product.quantity * product.price;
    const discountAmount = (itemTotal * product.discount) / 100;
    const afterDiscount = itemTotal - discountAmount;
    return afterDiscount + (afterDiscount * 18) / 100;
  };

  const calculateSubtotal = () =>
    billData.products.reduce((total, product) => total + product.quantity * product.price - (product.quantity * product.price * product.discount) / 100, 0);

  const calculateTotalGST = () => (calculateSubtotal() * 18) / 100;

  const calculateTotal = () => calculateSubtotal() + calculateTotalGST();

  const buildProductName = (product: NewProduct) => {
    const baseName = product.name || product.model || "Product";
    const details = [
      product.model && product.model !== baseName ? product.model : "",
      product.serialNumber ? `Serial: ${product.serialNumber}` : "",
      product.color || "",
    ].filter(Boolean);

    return details.length > 0 ? `${baseName} - ${details.join(" - ")}` : baseName;
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const applyExtractedDetails = (details: ExtractedProductDetails) => {
    setNewProduct((prev) => ({
      ...prev,
      name: details.productName || prev.name,
      model: details.model || prev.model,
      serialNumber: details.serialNumber || prev.serialNumber,
      color: details.color || prev.color,
      price: typeof details.price === "number" && details.price > 0 ? details.price : prev.price,
    }));
  };

  const extractDetailsFromPhotos = async (photos: ProductPhoto[]) => {
    if (photos.length === 0) return;

    setIsExtractingDetails(true);
    setExtractionStatus("Reading product details from photo...");

    try {
      const images = await Promise.all(photos.map((photo) => fileToDataUrl(photo.file)));
      const { data, error } = await supabase.functions.invoke<ExtractedProductDetails>("extract-product-details", {
        body: { images },
      });

      if (error) throw error;
      if (!data) throw new Error("No product details returned");

      applyExtractedDetails(data);
      setExtractionStatus("Product details filled from photo.");
    } catch (error) {
      console.error("Error extracting product details:", error);
      setExtractionStatus("Could not read the photo. Fill the details manually or try another photo.");
    } finally {
      setIsExtractingDetails(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
    event.target.value = "";

    if (selectedFiles.length === 0) return;

    const availableSlots = Math.max(0, 2 - productPhotos.length);
    const acceptedFiles = selectedFiles.slice(0, availableSlots);

    if (acceptedFiles.length < selectedFiles.length) {
      setExtractionStatus("Only two product photos can be uploaded.");
    }

    const nextPhotos = [
      ...productPhotos,
      ...acceptedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${createId()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ];

    setProductPhotos(nextPhotos);
    await extractDetailsFromPhotos(nextPhotos);
  };

  const removeProductPhoto = (id: string) => {
    setProductPhotos((prev) => {
      const photo = prev.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const addProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;

    const product: Product = {
      id: createId(),
      ...newProduct,
      name: buildProductName(newProduct),
    };

    setBillData((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));
    setNewProduct(createEmptyProduct());
  };

  const removeProduct = (id: string) => {
    setBillData((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product.id !== id),
    }));
  };

  const getInvoicePdfData = () => ({
    customerName: billData.customerName,
    customerPhone: billData.customerPhone,
    invoiceNo: billData.invoiceNo,
    date: billData.date,
    products: billData.products,
    subtotal: calculateSubtotal(),
    gst: calculateTotalGST(),
    total: calculateTotal(),
  });

  const getInvoiceShareText = () =>
    `Tax Invoice - HARI COLLECTION\nInvoice No: ${billData.invoiceNo}\nCustomer: ${billData.customerName}\nTotal: ${formatCurrency(calculateTotal())}`;

  const shareToWhatsApp = async () => {
    if (shareWithCustomerDirectly && !billData.customerPhone) {
      alert("Please enter customer phone number");
      return;
    }

    const phoneNumber = normalizeWhatsAppPhone(billData.customerPhone);
    const shareText = getInvoiceShareText();

    try {
      if (shareWithCustomerDirectly) {
        if (phoneNumber.length < 10) {
          alert("Please enter a valid customer phone number");
          return;
        }

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
        return;
      }

      const pdfFile = await createInvoicePdfFile(getInvoicePdfData());

      if (navigator.canShare?.({ files: [pdfFile] })) {
        await navigator.share({
          title: `Invoice ${billData.invoiceNo}`,
          text: shareText,
          files: [pdfFile],
        });
      } else {
        await downloadInvoicePdf(getInvoicePdfData());
        alert("PDF downloaded. Attach it in WhatsApp to share the invoice.");
      }

    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("Error sharing invoice PDF:", error);
      await downloadInvoicePdf(getInvoicePdfData());
      alert("Sharing was not available, so the invoice PDF was downloaded.");
    }
  };

  const saveInvoicePdf = async () => {
    await downloadInvoicePdf(getInvoicePdfData());
  };

  return (
    <div className="space-y-4 px-2 pb-24 pt-2 sm:px-4">
      <Card id="add-product-section">
        <CardHeader className="space-y-1 pb-3">
          <CardTitle className="text-base font-semibold">1. Upload Photo</CardTitle>
          <p className="text-sm text-muted-foreground">Upload up to two product photos to fill brand, model, serial number, and color.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Label
              htmlFor="productPhotoGallery"
              className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted/30 px-3 py-4 text-center"
            >
              {isExtractingDetails ? <Loader2 className="mb-2 h-5 w-5 animate-spin" /> : <Upload className="mb-2 h-5 w-5" />}
              <span className="text-sm font-medium">{isExtractingDetails ? "Extracting..." : "From gallery"}</span>
              <span className="text-xs text-muted-foreground">{productPhotos.length}/2 selected</span>
            </Label>
            <Label
              htmlFor="productPhotoCamera"
              className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted/30 px-3 py-4 text-center"
            >
              {isExtractingDetails ? <Loader2 className="mb-2 h-5 w-5 animate-spin" /> : <Camera className="mb-2 h-5 w-5" />}
              <span className="text-sm font-medium">{isExtractingDetails ? "Extracting..." : "Open camera"}</span>
              <span className="text-xs text-muted-foreground">Take product photo</span>
            </Label>
          </div>
          <Input
            id="productPhotoGallery"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={productPhotos.length >= 2 || isExtractingDetails}
            onChange={handlePhotoUpload}
          />
          <Input
            id="productPhotoCamera"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            disabled={productPhotos.length >= 2 || isExtractingDetails}
            onChange={handlePhotoUpload}
          />
          {isExtractingDetails && (
            <div className="overflow-hidden rounded-md border bg-background shadow-sm">
              <div className="flex items-start gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">Reading product photo</p>
                      <p className="text-xs text-muted-foreground">Extracting brand, model, serial number, color, and price.</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">{Math.round(extractionProgress)}%</span>
                  </div>
                  <Progress value={extractionProgress} className="h-2" />
                </div>
              </div>
            </div>
          )}
          {productPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {productPhotos.map((photo) => (
                <div key={photo.id} className="relative overflow-hidden rounded-md border bg-muted">
                  <img src={photo.previewUrl} alt="Uploaded product" className="h-28 w-full object-cover" />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => removeProductPhoto(photo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {extractionStatus && <p className="text-sm text-muted-foreground">{extractionStatus}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={billData.customerName}
              onChange={(e) => setBillData((prev) => ({ ...prev, customerName: e.target.value }))}
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <Label htmlFor="customerPhone">Phone Number</Label>
            <Input
              id="customerPhone"
              value={billData.customerPhone}
              onChange={(e) => setBillData((prev) => ({ ...prev, customerPhone: e.target.value }))}
              placeholder="Enter phone number"
              type="tel"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Qty</Label>
            <Input
              id="quantity"
              type="number"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
              min="1"
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price === 0 ? "" : newProduct.price}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value === "" ? 0 : parseFloat(e.target.value) || 0 }))}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label htmlFor="productModel">Model</Label>
              <Input
                id="productModel"
                value={newProduct.model}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, model: e.target.value }))}
                placeholder="Model"
              />
            </div>
            <div>
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                value={newProduct.serialNumber}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, serialNumber: e.target.value }))}
                placeholder="Serial number"
              />
            </div>
            <div>
              <Label htmlFor="productColor">Color</Label>
              <Input
                id="productColor"
                value={newProduct.color}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, color: e.target.value }))}
                placeholder="Color"
              />
            </div>
          </div>

          <Button onClick={addProduct} className="h-12 w-full text-base font-semibold" disabled={!newProduct.name || newProduct.price <= 0}>
            <Plus className="mr-2 h-4 w-4" />
            Add product to invoice
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Invoice Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="invoiceDate">Invoice Date</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={billData.date}
              onChange={(e) => setBillData((prev) => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="invoiceNo">Invoice Number</Label>
            <Input
              id="invoiceNo"
              value={billData.invoiceNo}
              onChange={(e) => setBillData((prev) => ({ ...prev, invoiceNo: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {billData.products.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {billData.products.map((product) => (
              <div key={product.id} className="flex items-start justify-between gap-3 rounded-md border p-3">
                <div className="min-w-0 flex-1">
                  <h4 className="break-words font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Qty: {product.quantity} x {formatCurrency(product.price)}
                    {product.discount > 0 && ` | ${product.discount}% off`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-semibold">{formatCurrency(calculateAmount(product))}</span>
                  <Button variant="outline" size="sm" onClick={() => removeProduct(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {billData.products.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              <span>Invoice Preview</span>
              <span className="text-sm font-normal text-muted-foreground">{billData.invoiceNo}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 text-center">
              <h2 className="text-lg font-bold tracking-wide">HARI COLLECTION</h2>
              <p className="text-xs text-muted-foreground">
                Shop No. 2068, 2nd Floor, Nathani Heights, Commercial Arcade, Bellasis Road, Mumbai-400008
              </p>
              <p className="text-xs">Phone: 9967441689 | GSTIN: 27BDMPA9576PIZM</p>
            </div>

            <Separator />

            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <p className="font-medium">Bill To</p>
                <p>{billData.customerName || "-"}</p>
                <p>{billData.customerPhone || "-"}</p>
              </div>
              <div className="sm:text-right">
                <p>Date: {billData.date}</p>
                <p>Items: {billData.products.length}</p>
              </div>
            </div>

            <div className="rounded-md border bg-muted/20 p-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>GST (18%)</span>
                <span>{formatCurrency(calculateTotalGST())}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between rounded-md bg-foreground px-3 py-2 text-lg font-bold text-background">
                <span>Total</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Label htmlFor="directCustomerShare" className="font-medium">
                    Send to customer number
                  </Label>
                  <p className="text-xs text-muted-foreground">On opens WhatsApp directly. Off shares the PDF from the system share sheet.</p>
                </div>
                <Switch id="directCustomerShare" checked={shareWithCustomerDirectly} onCheckedChange={setShareWithCustomerDirectly} />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                onClick={shareToWhatsApp}
                className="bg-green-600 hover:bg-green-700"
                disabled={!billData.customerName || billData.products.length === 0 || (shareWithCustomerDirectly && !billData.customerPhone)}
              >
                <Phone className="mr-2 h-4 w-4" />
                {shareWithCustomerDirectly ? "Open WhatsApp" : "Share PDF"}
              </Button>
              <Button onClick={saveInvoicePdf} variant="outline" disabled={billData.products.length === 0}>
                <FileText className="mr-2 h-4 w-4" />
                Save PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
