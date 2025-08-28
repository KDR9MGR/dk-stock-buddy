import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Share, Phone, Camera, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { BrowserMultiFormatReader } from '@zxing/library';

type BillProduct = Database['public']['Tables']['bill_products']['Row'];

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
}

interface BillData {
  customerName: string;
  customerPhone: string;
  products: Product[];
  invoiceNo: string;
  date: string;
}

export const Bills = () => {
  const [billData, setBillData] = useState<BillData>({
    customerName: "",
    customerPhone: "",
    products: [],
    invoiceNo: `INV${Date.now().toString().slice(-4)}`,
    date: new Date().toLocaleDateString('en-GB')
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 1,
    price: 0,
    discount: 0
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BillProduct[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [scanningStatus, setScanningStatus] = useState('Starting camera...');
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const lastScannedCode = useRef<string | null>(null);
  const lastScannedTime = useRef<number>(0);

  // Listen for the custom event from header's Add Product button
  useEffect(() => {
    const handleOpenAddProduct = () => {
      setShowAddProductForm(true);
      // Scroll to the add product section
      const addProductSection = document.getElementById('add-product-section');
      if (addProductSection) {
        addProductSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('openAddProduct', handleOpenAddProduct);
    return () => {
      window.removeEventListener('openAddProduct', handleOpenAddProduct);
    };
  }, []);

  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const addProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct
      };
      setBillData(prev => ({
        ...prev,
        products: [...prev.products, product]
      }));
      setNewProduct({ name: "", quantity: 1, price: 0, discount: 0 });
    }
  };

  const removeProduct = (id: string) => {
    setBillData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const calculateAmount = (product: Product) => {
    const itemTotal = product.quantity * product.price;
    const discountAmount = (itemTotal * product.discount) / 100;
    const afterDiscount = itemTotal - discountAmount;
    const gstAmount = (afterDiscount * 18) / 100;
    return afterDiscount + gstAmount;
  };

  const calculateSubtotal = () => {
    return billData.products.reduce((total, product) => {
      const itemTotal = product.quantity * product.price;
      const discountAmount = (itemTotal * product.discount) / 100;
      return total + (itemTotal - discountAmount);
    }, 0);
  };

  const calculateTotalGST = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * 18) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalGST();
  };

  // Search products in bill_products table
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bill_products')
        .select('*')
        .or(`product_name.ilike.%${query}%,serial_number.ilike.%${query}%,color.ilike.%${query}%`)
        .limit(10);

      if (error) {
        console.error('Error searching products:', error);
        return;
      }

      setSearchResults(data || []);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Handle search input change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Select product from search results
  const selectProduct = (product: BillProduct) => {
    setNewProduct({
      name: `${product.product_name} - ${product.serial_number}${product.color ? ` (${product.color})` : ''}`,
      quantity: 1,
      price: 0,
      discount: 0
    });
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Handle barcode detection
  const handleBarcodeDetected = async (result: string) => {
    const currentTime = Date.now();
    
    // Prevent duplicate scans within 3 seconds of the same barcode
    if (lastScannedCode.current === result && (currentTime - lastScannedTime.current) < 3000) {
      return;
    }
    
    lastScannedCode.current = result;
    lastScannedTime.current = currentTime;
    
    setScanningStatus(`Barcode detected: ${result}`);
    
    // Search for product by serial number
    const { data: products, error } = await supabase
      .from('bill_products')
      .select('*')
      .eq('serial_number', result)
      .limit(1);

    if (error) {
      console.error('Error searching for product:', error);
      setScanningStatus('Error searching for product');
      return;
    }

    if (products && products.length > 0) {
      const product = products[0];
      
      // Automatically add the scanned product to the bill
       const newBillProduct: Product = {
         id: Date.now().toString(),
         name: `${product.product_name} - ${product.serial_number}${product.color ? ` (${product.color})` : ''}`,
         quantity: 1,
         price: (product as any).price || 0,
         discount: 0
       };
      
      setBillData(prev => ({
        ...prev,
        products: [...prev.products, newBillProduct]
      }));
      
      setScanningStatus(`Product added to bill: ${product.product_name}`);
      
      // Close scanner after successful detection
      setTimeout(() => {
        stopCamera();
      }, 2000);
    } else {
      setScanningStatus('Product not found in database');
      setTimeout(() => {
        setScanningStatus('Scanning for barcode...');
      }, 2000);
    }
  };

  // Start camera for serial number scanning
  const startCamera = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera access is not supported in this browser.');
        return;
      }

      setScanningStatus('Starting camera...');
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setCameraStream(stream);
      
      // Initialize barcode reader
      if (!codeReader.current) {
        codeReader.current = new BrowserMultiFormatReader();
      }
      
      setScanningStatus('Camera ready, scanning for barcode...');
      
      // Start scanning when video is ready
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current && codeReader.current) {
            codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
              if (result) {
                handleBarcodeDetected(result.getText());
              }
              // Don't log every scanning attempt as it's continuous
            });
          }
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Unable to access camera.';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera access denied. Please allow camera permissions and try again.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera found on this device.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Camera is already in use by another application.';
        }
      }
      
      alert(errorMessage);
      setIsScanning(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    
    // Stop barcode reader
    if (codeReader.current) {
      codeReader.current.reset();
    }
    
    // Reset scanning state
    lastScannedCode.current = null;
    lastScannedTime.current = 0;
    
    setIsScanning(false);
    setScanningStatus('Starting camera...');
  };

  // Search by serial number (simulated scan result)
  const searchBySerialNumber = async (serialNumber: string) => {
    try {
      const { data, error } = await supabase
        .from('bill_products')
        .select('*')
        .eq('serial_number', serialNumber)
        .single();

      if (error || !data) {
        alert('Product not found with this serial number');
        return;
      }

      selectProduct(data);
      stopCamera();
    } catch (error) {
      console.error('Error searching by serial number:', error);
      alert('Error searching for product');
    }
  };

  const generateWhatsAppMessage = () => {
    let message = `🧾 *TAX INVOICE - HARI COLLECTION*\n\n`;
    message += `📋 *Invoice Details:*\n`;
    message += `Invoice No: ${billData.invoiceNo}\n`;
    message += `Date: ${billData.date}\n\n`;
    
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${billData.customerName}\n`;
    message += `Phone: ${billData.customerPhone}\n\n`;
    
    message += `🛍️ *Items:*\n`;
    billData.products.forEach((product, index) => {
      const itemTotal = product.quantity * product.price;
      const discountAmount = (itemTotal * product.discount) / 100;
      const afterDiscount = itemTotal - discountAmount;
      const gstAmount = (afterDiscount * 18) / 100;
      const finalAmount = afterDiscount + gstAmount;
      
      message += `${index + 1}. ${product.name}\n`;
      message += `   Qty: ${product.quantity} × ₹${product.price}`;
      if (product.discount > 0) {
        message += ` (${product.discount}% off)`;
      }
      message += ` + 18% GST\n`;
      message += `   Amount: ₹${finalAmount.toFixed(2)}\n\n`;
    });
    
    message += `💰 *Bill Summary:*\n`;
    message += `Subtotal (Before GST): ₹${calculateSubtotal().toFixed(2)}\n`;
    message += `GST (18%): ₹${calculateTotalGST().toFixed(2)}\n`;
    message += `*Total Amount: ₹${calculateTotal().toFixed(2)}*\n\n`;
    
    message += `🏪 *HARI COLLECTION*\n`;
    message += `📍 Shop No. 2068, 2nd Floor, Nathani Heights,\nCommercial Arcade, Bellasis Road, Mumbai-400008\n`;
    message += `📞 9967441689\n`;
    message += `🆔 GSTIN: 27BDMPA9576PIZM\n\n`;
    message += `Thank you for your business! 🙏`;
    
    return encodeURIComponent(message);
  };

  const shareToWhatsApp = () => {
    if (!billData.customerPhone) {
      alert("Please enter customer phone number");
      return;
    }
    
    const message = generateWhatsAppMessage();
    const phoneNumber = billData.customerPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const saveAsPDF = () => {
    // Create a new window with the invoice content for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tax Invoice</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #fff;
            color: #333;
            line-height: 1.4;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #2563eb;
            border-radius: 8px;
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            text-align: center; 
            padding: 20px;
            margin: 0;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .content {
            padding: 30px;
          }
          .company-details { 
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
          }
          .company-details h2 {
            margin: 0 0 10px 0;
            color: #2563eb;
            font-size: 24px;
            font-weight: 700;
          }
          .company-details p {
            margin: 5px 0;
            color: #64748b;
          }
          .bill-details { 
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f1f5f9;
            border-radius: 8px;
          }
          .bill-section h3 {
            margin: 0 0 15px 0;
            color: #2563eb;
            font-size: 16px;
            font-weight: 600;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
          }
          .bill-section p {
            margin: 8px 0;
            font-size: 14px;
          }
          .products-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          .products-table th { 
            background: #2563eb;
            color: white;
            padding: 15px 10px;
            text-align: center;
            font-weight: 600;
            font-size: 12px;
          }
          .products-table td { 
            border: 1px solid #e2e8f0;
            padding: 12px 10px;
            text-align: center;
            font-size: 12px;
          }
          .products-table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          .products-table tbody tr:hover {
            background: #e2e8f0;
          }
          .summary-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            margin-bottom: 30px;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .summary-row:last-child {
            border-bottom: none;
            font-weight: 700;
            font-size: 18px;
            color: #2563eb;
            border-top: 2px solid #2563eb;
            padding-top: 15px;
            margin-top: 10px;
          }
          .footer-section {
            display: grid;
            grid-template-columns: 1fr 170px;
            gap: 30px;
            align-items: end;
          }
          .stamp-area { 
            width: 150px;
            height: 80px;
            border: 2px dashed #94a3b8;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 12px;
            text-align: center;
            background: #f8fafc;
            border-radius: 4px;
          }
          .signature-area {
            text-align: center;
            margin-top: 15px;
          }
          .signature-area p {
            margin: 5px 0;
            font-size: 12px;
            color: #64748b;
          }
          .company-footer {
            text-align: left;
          }
          .company-footer h4 {
            margin: 0;
            color: #2563eb;
            font-size: 16px;
          }
          @media print {
            body { margin: 0; padding: 10px; }
            .invoice-container { border: 1px solid #000; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>TAX INVOICE</h1>
          </div>
          
          <div class="content">
            <div class="company-details">
              <h2>HARI COLLECTION</h2>
              <p><strong>SHOP NO. 2068, 2ND FLOOR, NATHANI HEIGHTS,<br>COMMERCIAL ARCADE, BELLASIS ROAD, MUMBAI-400008</strong></p>
              <p><strong>Phone:</strong> 9967441689 | <strong>GSTIN:</strong> 27BDMPA9576PIZM | <strong>State:</strong> Maharashtra</p>
            </div>
            
            <div class="bill-details">
              <div class="bill-section">
                <h3>Bill To</h3>
                <p><strong>Customer:</strong> ${billData.customerName}</p>
                <p><strong>Phone:</strong> ${billData.customerPhone}</p>
              </div>
              <div class="bill-section">
                <h3>Invoice Details</h3>
                <p><strong>Invoice No:</strong> ${billData.invoiceNo}</p>
                <p><strong>Date:</strong> ${billData.date}</p>
              </div>
            </div>
            
            <table class="products-table">
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th style="width: 35%">Item Name</th>
                  <th style="width: 10%">Qty</th>
                  <th style="width: 15%">Price/Unit</th>
                  <th style="width: 10%">Discount</th>
                  <th style="width: 10%">GST</th>
                  <th style="width: 15%">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${billData.products.map((product, index) => {
                  const itemTotal = product.quantity * product.price;
                  const discountAmount = (itemTotal * product.discount) / 100;
                  const afterDiscount = itemTotal - discountAmount;
                  const gstAmount = (afterDiscount * 18) / 100;
                  const finalAmount = afterDiscount + gstAmount;
                  return `
                    <tr>
                      <td>${index + 1}</td>
                      <td style="text-align: left; padding-left: 15px;">${product.name}</td>
                      <td>${product.quantity}</td>
                      <td>₹${product.price.toFixed(2)}</td>
                      <td>${product.discount}%</td>
                      <td>18%</td>
                      <td><strong>₹${finalAmount.toFixed(2)}</strong></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
            
            <div class="summary-section">
              <div class="summary-row">
                <span>Subtotal (Before GST):</span>
                <span>₹${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>GST (18%):</span>
                <span>₹${calculateTotalGST().toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Total Amount:</span>
                <span>₹${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div class="footer-section">
              <div class="company-footer">
                <h4>For: Hari Collection</h4>
                <p style="margin-top: 20px; color: #64748b;">Thank you for your business!</p>
              </div>
              <div>
                <div class="stamp-area">
                  Company Seal/Stamp
                </div>
                <div class="signature-area">
                  <p style="border-top: 1px solid #94a3b8; padding-top: 10px; margin-top: 15px;">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={billData.customerName}
              onChange={(e) => setBillData(prev => ({ ...prev, customerName: e.target.value }))}
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <Label htmlFor="customerPhone">Phone Number</Label>
            <Input
              id="customerPhone"
              value={billData.customerPhone}
              onChange={(e) => setBillData(prev => ({ ...prev, customerPhone: e.target.value }))}
              placeholder="Enter phone number"
              type="tel"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Product */}
      <Card id="add-product-section">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Add Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Search */}
          <div className="relative">
            <Label htmlFor="productSearch">Search Product</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="productSearch"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name, serial number, or color"
                  className="pl-10"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={startCamera}
                disabled={isScanning}
              >
                <Camera className="w-4 h-4 mr-2" />
                {isScanning ? 'Scanning...' : 'Scan'}
              </Button>
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => selectProduct(product)}
                  >
                    <div className="font-medium">{product.product_name}</div>
                    <div className="text-sm text-gray-600">
                      Serial: {product.serial_number}
                      {product.color && ` • Color: ${product.color}`}
                      • Qty: {product.quantity}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Camera Modal */}
          {isScanning && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Scan Serial Number</h3>
                  <Button variant="outline" onClick={stopCamera}>
                    Close
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 h-48 flex items-center justify-center rounded overflow-hidden relative">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-sm p-2 rounded">
                      {scanningStatus}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="manualSerial">Or enter serial number manually:</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="manualSerial"
                        placeholder="Enter serial number"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            searchBySerialNumber(target.value);
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                          if (input?.value) {
                            searchBySerialNumber(input.value);
                          }
                        }}
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={newProduct.name}
              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name or select from search"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={newProduct.discount}
                onChange={(e) => setNewProduct(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                min="0"
                max="100"
              />
            </div>
          </div>
          <Button onClick={addProduct} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </CardContent>
      </Card>

      {/* Products List */}
      {billData.products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billData.products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {product.quantity} × ₹{product.price} 
                      {product.discount > 0 && ` (${product.discount}% off)`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">₹{calculateAmount(product).toFixed(2)}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bill Preview */}
      {billData.products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">TAX INVOICE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Company Header */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold">HARI COLLECTION</h2>
              <p className="text-sm text-muted-foreground">
                SHOP NO. 2068, 2ND FLOOR, NATHANI HEIGHTS,<br />
                COMMERCIAL ARCADE, BELLASIS ROAD, MUMBAI-400008
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> 9967441689 | 
                <span className="font-medium">GSTIN:</span> 27BDMPA9576PIZM
              </p>
            </div>

            <Separator />

            {/* Bill Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-medium">Bill To:</span> {billData.customerName}</p>
                <p><span className="font-medium">Phone:</span> {billData.customerPhone}</p>
              </div>
              <div className="text-right">
                <p><span className="font-medium">Invoice No:</span> {billData.invoiceNo}</p>
                <p><span className="font-medium">Date:</span> {billData.date}</p>
              </div>
            </div>

            <Separator />

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">#</th>
                    <th className="border border-gray-300 p-2 text-left">Item Name</th>
                    <th className="border border-gray-300 p-2 text-center">Qty</th>
                    <th className="border border-gray-300 p-2 text-right">Price/Unit</th>
                    <th className="border border-gray-300 p-2 text-center">Discount</th>
                    <th className="border border-gray-300 p-2 text-center">GST</th>
                    <th className="border border-gray-300 p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {billData.products.map((product, index) => {
                    const itemTotal = product.quantity * product.price;
                    const discountAmount = (itemTotal * product.discount) / 100;
                    const afterDiscount = itemTotal - discountAmount;
                    const gstAmount = (afterDiscount * 18) / 100;
                    const finalAmount = afterDiscount + gstAmount;
                    return (
                      <tr key={product.id}>
                        <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{product.name}</td>
                        <td className="border border-gray-300 p-2 text-center">{product.quantity}</td>
                        <td className="border border-gray-300 p-2 text-right">₹{product.price.toFixed(2)}</td>
                        <td className="border border-gray-300 p-2 text-center">{product.discount}%</td>
                        <td className="border border-gray-300 p-2 text-center">18%</td>
                        <td className="border border-gray-300 p-2 text-right font-medium">₹{finalAmount.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Separator />

            {/* Bill Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal (Before GST):</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%):</span>
                <span>₹{calculateTotalGST().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Stamp and Signature Area */}
            <div className="mt-8 flex justify-between items-end">
              <div className="text-sm text-gray-600">
                <p className="font-semibold">For: Hari Collection</p>
              </div>
              <div className="text-center">
                <div className="w-48 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 mb-2">
                  Company Seal/Stamp
                </div>
                <div className="text-xs text-gray-600 border-t border-gray-300 pt-2">
                  Authorized Signatory
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={shareToWhatsApp} 
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!billData.customerName || !billData.customerPhone || billData.products.length === 0}
              >
                <Phone className="w-4 h-4 mr-2" />
                Share to WhatsApp
              </Button>
              <Button 
                onClick={saveAsPDF}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={billData.products.length === 0}
              >
                <Share className="w-4 h-4 mr-2" />
                Save as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};