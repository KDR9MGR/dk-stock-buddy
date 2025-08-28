import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Camera, X, ArrowLeft, Save } from 'lucide-react';

interface ProductManagementProps {
  onBack?: () => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [product, setProduct] = useState({
    product_name: '',
    serial_number: '',
    color: '',
    quantity: 1,
    price: 0
  });
  const [isScanning, setIsScanning] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [scanningStatus, setScanningStatus] = useState('Starting camera...');
  const [isSaving, setIsSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  // Handle barcode detection for serial number
  const handleBarcodeDetected = (result: string) => {
    setScanningStatus(`Barcode detected: ${result}`);
    setProduct(prev => ({ ...prev, serial_number: result }));
    
    // Close scanner after successful detection
    setTimeout(() => {
      stopCamera();
    }, 1500);
  };

  // Start camera for serial number scanning
  const startCamera = async () => {
    try {
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
    
    if (codeReader.current) {
      codeReader.current.reset();
    }
    
    setIsScanning(false);
    setScanningStatus('Starting camera...');
  };

  // Save product to database
  const saveProduct = async () => {
    if (!product.product_name || !product.serial_number) {
      toast({
        title: "Validation Error",
        description: "Please fill in product name and serial number.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to save products.",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from('bill_products')
        .insert({
          product_name: product.product_name,
          serial_number: product.serial_number,
          color: product.color,
          quantity: product.quantity,
          price: product.price,
          created_by: user.id
        });

      if (error) {
        console.error('Error saving product:', error);
        toast({
          title: "Error",
          description: "Failed to save product. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Product saved successfully!"
        });
        // Reset form
        setProduct({
          product_name: '',
          serial_number: '',
          color: '',
          quantity: 1,
          price: 0
        });
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Cleanup camera on unmount
  React.useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <CardTitle>Add New Product</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name *</Label>
            <Input
              id="productName"
              value={product.product_name}
              onChange={(e) => setProduct(prev => ({ ...prev, product_name: e.target.value }))}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <Label htmlFor="serialNumber">Serial Number *</Label>
            <div className="flex gap-2">
              <Input
                id="serialNumber"
                value={product.serial_number}
                onChange={(e) => setProduct(prev => ({ ...prev, serial_number: e.target.value }))}
                placeholder="Enter or scan serial number"
              />
              <Button variant="outline" onClick={startCamera}>
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={product.color}
              onChange={(e) => setProduct(prev => ({ ...prev, color: e.target.value }))}
              placeholder="Enter product color"
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => setProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={product.price}
              onChange={(e) => setProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter product price"
            />
          </div>

          <Button 
            onClick={saveProduct} 
            disabled={isSaving}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Product'}
          </Button>
        </CardContent>
      </Card>

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};