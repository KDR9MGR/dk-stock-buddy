import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Plus, Trash2, FileText, Share } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
}

interface BillData {
  customerName: string;
  phoneNumber: string;
  products: Product[];
}

const BillsTest = () => {
  const [billData, setBillData] = useState<BillData>({
    customerName: '',
    phoneNumber: '',
    products: [{ id: '1', name: '', quantity: 1, price: 0, discount: 0 }]
  });

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      price: 0,
      discount: 0
    };
    setBillData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const removeProduct = (id: string) => {
    setBillData(prev => ({
      ...prev,
      products: prev.products.filter(product => product.id !== id)
    }));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setBillData(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      )
    }));
  };

  const calculateSubtotal = () => {
    return billData.products.reduce((total, product) => {
      const productTotal = product.quantity * product.price;
      const discountAmount = (productTotal * product.discount) / 100;
      return total + (productTotal - discountAmount);
    }, 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const shareToWhatsApp = () => {
    const message = `*GST INVOICE*\n\n*Customer:* ${billData.customerName}\n*Phone:* ${billData.phoneNumber}\n\n*Products:*\n${billData.products.map(product => `• ${product.name} - Qty: ${product.quantity} - ₹${product.price} each`).join('\n')}\n\n*Subtotal:* ₹${calculateSubtotal().toFixed(2)}\n*GST (18%):* ₹${calculateGST().toFixed(2)}\n*Total:* ₹${calculateTotal().toFixed(2)}\n\nThank you for your business!`;
    
    const whatsappUrl = `https://wa.me/${billData.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const saveAsPDF = () => {
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>GST Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .company-info { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
          .bill-to { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .totals { text-align: right; margin-bottom: 30px; }
          .stamp-area { border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 20px 0; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>GST INVOICE</h1>
        </div>
        
        <div class="company-info">
          <h3>HARI COLLECTION</h3>
          <p>SHOP NO. 2068, 2ND FLOOR, NATHANI HEIGHTS, COMMERCIAL ARCADE, BELLASIS ROAD, MUMBAI- 400 008</p>
          <p>Phone: 9967441689 | GSTIN: 27BDMPA9576PIZM | State: Maharashtra</p>
        </div>
        
        <div class="bill-to">
          <h4>Bill To:</h4>
          <p><strong>Customer:</strong> ${billData.customerName}</p>
          <p><strong>Phone:</strong> ${billData.phoneNumber}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>Discount</th>
              <th>GST</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${billData.products.map(product => {
              const productTotal = product.quantity * product.price;
              const discountAmount = (productTotal * product.discount) / 100;
              const afterDiscount = productTotal - discountAmount;
              const gstAmount = afterDiscount * 0.18;
              const finalAmount = afterDiscount + gstAmount;
              return `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.quantity}</td>
                  <td>₹${product.price.toFixed(2)}</td>
                  <td>${product.discount}%</td>
                  <td>18%</td>
                  <td>₹${finalAmount.toFixed(2)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        
        <div class="totals">
          <p><strong>Subtotal: ₹${calculateSubtotal().toFixed(2)}</strong></p>
          <p><strong>GST (18%): ₹${calculateGST().toFixed(2)}</strong></p>
          <h3>Total: ₹${calculateTotal().toFixed(2)}</h3>
        </div>
        
        <div class="stamp-area">
          <p><strong>For: Hari Collection</strong></p>
          <br><br>
          <p>Authorized Signatory</p>
          <p>(Stamp & Signature)</p>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>This is a computer generated invoice.</p>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            GST Bill Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={billData.phoneNumber}
                onChange={(e) => setBillData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <Separator />

          {/* Products */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Products</h3>
              <Button onClick={addProduct} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {billData.products.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <Label>Product Name</Label>
                      <Input
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateProduct(product.id, 'quantity', parseInt(e.target.value) || 0)}
                        min="1"
                      />
                    </div>
                    <div>
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label>Discount (%)</Label>
                      <Input
                        type="number"
                        value={product.discount}
                        onChange={(e) => updateProduct(product.id, 'discount', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                      disabled={billData.products.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Bill Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Bill Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{calculateGST().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Stamp/Signature Area */}
          <div className="border-2 border-dashed border-gray-300 p-8 text-center bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">For: Hari Collection</p>
            <div className="h-16 mb-2"></div>
            <p className="text-sm text-gray-600">Authorized Signatory</p>
            <p className="text-xs text-gray-500">(Stamp & Signature)</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={shareToWhatsApp} 
              className="flex-1"
              disabled={!billData.customerName || !billData.phoneNumber || billData.products.some(p => !p.name)}
            >
              <Share className="h-4 w-4 mr-2" />
              Share to WhatsApp
            </Button>
            <Button 
              onClick={saveAsPDF} 
              variant="outline" 
              className="flex-1"
              disabled={!billData.customerName || billData.products.some(p => !p.name)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Save as PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillsTest;