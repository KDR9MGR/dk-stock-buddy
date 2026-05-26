import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Camera, FileText, Loader2, Phone, Plus, Search, Trash2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { createInvoicePdfFile, downloadInvoicePdf } from "@/lib/invoicePdf";

type BillProduct = Database["public"]["Tables"]["bill_products"]["Row"];
type BillProductWithPrice = BillProduct & { price?: number | null };

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
  const [extractionStatus, setExtractionStatus] = useState("");
  const [shareWithCustomerDirectly, setShareWithCustomerDirectly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BillProductWithPrice[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [scanningStatus, setScanningStatus] = useState("Starting camera...");

  const videoRef = useRef<HTMLVideoElement>(null);
  const manualSerialRef = useRef<HTMLInputElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const lastScannedCode = useRef<string | null>(null);
  const lastScannedTime = useRef(0);
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
      cameraStream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStream]);

  useEffect(() => {
    return () => {
      productPhotosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      codeReader.current?.reset();
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      const { data, error } = await supabase
        .from("bill_products")
        .select("*")
        .or(`product_name.ilike.%${searchQuery}%,serial_number.ilike.%${searchQuery}%,color.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) {
        console.error("Error searching products:", error);
        return;
      }

      setSearchResults(data || []);
      setShowSearchResults(true);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchQuery]);

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

  const selectProduct = (product: BillProductWithPrice) => {
    setNewProduct({
      name: product.product_name,
      model: product.product_name,
      serialNumber: product.serial_number,
      color: product.color || "",
      quantity: 1,
      price: product.price ?? 0,
      discount: 0,
    });
    setSearchQuery("");
    setShowSearchResults(false);
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

  const stopCamera = () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
    codeReader.current?.reset();
    lastScannedCode.current = null;
    lastScannedTime.current = 0;
    setIsScanning(false);
    setScanningStatus("Starting camera...");
  };

  const handleBarcodeDetected = async (result: string) => {
    const currentTime = Date.now();
    if (lastScannedCode.current === result && currentTime - lastScannedTime.current < 3000) return;

    lastScannedCode.current = result;
    lastScannedTime.current = currentTime;
    setScanningStatus(`Barcode detected: ${result}`);

    const { data, error } = await supabase
      .from("bill_products")
      .select("*")
      .eq("serial_number", result)
      .limit(1);

    if (error) {
      console.error("Error searching for product:", error);
      setScanningStatus("Error searching for product");
      return;
    }

    const product = data?.[0] as BillProductWithPrice | undefined;
    if (!product) {
      setScanningStatus("Product not found in database");
      window.setTimeout(() => setScanningStatus("Scanning for barcode..."), 2000);
      return;
    }

    setBillData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: createId(),
          name: `${product.product_name} - ${product.serial_number}${product.color ? ` (${product.color})` : ""}`,
          model: product.product_name,
          serialNumber: product.serial_number,
          color: product.color || "",
          quantity: 1,
          price: product.price ?? 0,
          discount: 0,
        },
      ],
    }));
    setScanningStatus(`Product added: ${product.product_name}`);
    window.setTimeout(stopCamera, 1500);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Camera access is not supported in this browser.");
      return;
    }

    try {
      setScanningStatus("Starting camera...");
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setCameraStream(stream);
      codeReader.current ??= new BrowserMultiFormatReader();
      setScanningStatus("Camera ready, scanning for barcode...");

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (!videoRef.current || !codeReader.current) return;
          codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
            if (result) handleBarcodeDetected(result.getText());
          });
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsScanning(false);
      alert("Unable to access camera. Please allow camera permissions and try again.");
    }
  };

  const searchBySerialNumber = async (serialNumber: string) => {
    if (!serialNumber.trim()) return;

    const { data, error } = await supabase
      .from("bill_products")
      .select("*")
      .eq("serial_number", serialNumber.trim())
      .single();

    if (error || !data) {
      alert("Product not found with this serial number");
      return;
    }

    selectProduct(data as BillProductWithPrice);
    stopCamera();
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

    const phoneNumber = billData.customerPhone.replace(/[^0-9]/g, "");
    const shareText = getInvoiceShareText();

    try {
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

      if (shareWithCustomerDirectly && phoneNumber) {
        window.open(`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(shareText)}`, "_blank");
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
          <CardTitle className="text-base font-semibold">Product Photo</CardTitle>
          <p className="text-sm text-muted-foreground">Upload up to two product photos to fill model, serial number, and color.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label
            htmlFor="productPhoto"
            className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted/30 px-4 py-5 text-center"
          >
            {isExtractingDetails ? <Loader2 className="mb-2 h-6 w-6 animate-spin" /> : <Upload className="mb-2 h-6 w-6" />}
            <span className="text-sm font-medium">{isExtractingDetails ? "Extracting details..." : "Upload product photo"}</span>
            <span className="text-xs text-muted-foreground">{productPhotos.length}/2 photos selected</span>
          </Label>
          <Input
            id="productPhoto"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={productPhotos.length >= 2 || isExtractingDetails}
            onChange={handlePhotoUpload}
          />
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Label htmlFor="productSearch">Search or Scan</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="productSearch"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name, serial number, or color"
                  className="pl-9"
                />
              </div>
              <Button type="button" variant="outline" onClick={startCamera} disabled={isScanning}>
                <Camera className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">{isScanning ? "Scanning" : "Scan"}</span>
              </Button>
            </div>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-background shadow-lg">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="block w-full border-b p-3 text-left last:border-b-0 hover:bg-muted"
                    onClick={() => selectProduct(product)}
                  >
                    <span className="block font-medium">{product.product_name}</span>
                    <span className="text-sm text-muted-foreground">
                      Serial: {product.serial_number}
                      {product.color && ` | Color: ${product.color}`} | Qty: {product.quantity}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

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

          <div className="grid grid-cols-3 gap-2">
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
                value={newProduct.price}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                value={newProduct.discount}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                min="0"
                max="100"
              />
            </div>
          </div>

          <Button onClick={addProduct} className="w-full" disabled={!newProduct.name || newProduct.price <= 0}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </CardContent>
      </Card>

      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-md bg-background p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold">Scan Serial Number</h3>
              <Button variant="outline" size="sm" onClick={stopCamera}>
                Close
              </Button>
            </div>
            <div className="space-y-4">
              <div className="relative h-52 overflow-hidden rounded-md bg-muted">
                <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
                <div className="absolute bottom-2 left-2 right-2 rounded bg-black/70 p-2 text-sm text-white">{scanningStatus}</div>
              </div>
              <div>
                <Label htmlFor="manualSerial">Enter serial number manually</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id="manualSerial"
                    ref={manualSerialRef}
                    placeholder="Serial number"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchBySerialNumber((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => searchBySerialNumber(manualSerialRef.current?.value || "")}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <p className="text-xs text-muted-foreground">Off shares the PDF with anyone from the share sheet.</p>
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
                Share PDF
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
