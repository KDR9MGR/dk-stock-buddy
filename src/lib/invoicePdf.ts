import { jsPDF } from "jspdf";

import notoSansBoldUrl from "@/assets/fonts/NotoSans-Bold.ttf?url";
import notoSansRegularUrl from "@/assets/fonts/NotoSans-Regular.ttf?url";

export interface InvoiceProduct {
  name: string;
  model?: string;
  serialNumber?: string;
  color?: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface InvoicePdfData {
  customerName: string;
  customerPhone: string;
  invoiceNo: string;
  date: string;
  products: InvoiceProduct[];
  subtotal: number;
  gst: number;
  total: number;
}

const FONT_REGULAR = "NotoSans-Regular.ttf";
const FONT_BOLD = "NotoSans-Bold.ttf";
const FONT_FAMILY = "NotoSans";

const money = (amount: number) => `₹${amount.toFixed(2)}`;

const productSubtitle = (product: InvoiceProduct) =>
  [
    product.model ? `Model: ${product.model}` : "",
    product.serialNumber ? `Serial: ${product.serialNumber}` : "",
    product.color ? `Color: ${product.color}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  const chunks: string[] = [];

  for (let i = 0; i < bytes.length; i += chunkSize) {
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + chunkSize)));
  }

  return btoa(chunks.join(""));
};

const fetchFont = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to load invoice font: ${response.status}`);
  }

  return arrayBufferToBase64(await response.arrayBuffer());
};

const loadInvoiceFonts = async (doc: jsPDF) => {
  const [regularFont, boldFont] = await Promise.all([fetchFont(notoSansRegularUrl), fetchFont(notoSansBoldUrl)]);

  doc.addFileToVFS(FONT_REGULAR, regularFont);
  doc.addFileToVFS(FONT_BOLD, boldFont);
  doc.addFont(FONT_REGULAR, FONT_FAMILY, "normal");
  doc.addFont(FONT_BOLD, FONT_FAMILY, "bold");
  doc.setFont(FONT_FAMILY, "normal");
};

const setFont = (doc: jsPDF, style: "normal" | "bold", size: number, color: [number, number, number] = [17, 24, 39]) => {
  doc.setFont(FONT_FAMILY, style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
};

const drawLabelValue = (doc: jsPDF, label: string, value: string, x: number, y: number, maxWidth: number) => {
  setFont(doc, "bold", 8, [100, 116, 139]);
  doc.text(label.toUpperCase(), x, y);
  setFont(doc, "normal", 10, [15, 23, 42]);
  doc.text(doc.splitTextToSize(value || "-", maxWidth), x, y + 14);
};

const drawPageFooter = (doc: jsPDF, pageWidth: number, pageHeight: number, margin: number) => {
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);
  setFont(doc, "normal", 8, [100, 116, 139]);
  doc.text("This is a computer generated invoice.", margin, pageHeight - 22);
  doc.text("Thank you for your business.", pageWidth - margin, pageHeight - 22, { align: "right" });
};

const drawTableHeader = (doc: jsPDF, y: number, margin: number, pageWidth: number) => {
  doc.setFillColor(31, 41, 55);
  doc.rect(margin, y, pageWidth - margin * 2, 28, "F");
  setFont(doc, "bold", 8, [255, 255, 255]);
  doc.text("#", margin + 12, y + 18);
  doc.text("DESCRIPTION", margin + 38, y + 18);
  doc.text("QTY", pageWidth - margin - 188, y + 18, { align: "right" });
  doc.text("RATE", pageWidth - margin - 126, y + 18, { align: "right" });
  doc.text("DISC", pageWidth - margin - 70, y + 18, { align: "right" });
  doc.text("TOTAL", pageWidth - margin - 12, y + 18, { align: "right" });
};

export const createInvoicePdfFile = async (invoice: InvoicePdfData) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  await loadInvoiceFonts(doc);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 34;
  const contentWidth = pageWidth - margin * 2;
  let y = 34;

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, 132, "F");
  doc.setFillColor(250, 204, 21);
  doc.rect(0, 0, 10, 132, "F");

  setFont(doc, "bold", 28, [15, 23, 42]);
  doc.text("TAX INVOICE", margin, y + 34);
  setFont(doc, "normal", 9, [71, 85, 105]);
  doc.text("Original for recipient", margin, y + 54);

  setFont(doc, "bold", 15, [15, 23, 42]);
  doc.text("HARI COLLECTION", pageWidth - margin, y + 18, { align: "right" });
  setFont(doc, "normal", 8.5, [71, 85, 105]);
  doc.text(
    doc.splitTextToSize("Shop No. 2068, 2nd Floor, Nathani Heights, Commercial Arcade, Bellasis Road, Mumbai-400008", 260),
    pageWidth - margin,
    y + 36,
    { align: "right" },
  );
  doc.text("Phone: 9967441689 | GSTIN: 27BDMPA9576PIZM", pageWidth - margin, y + 70, { align: "right" });

  y = 158;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 92, 6, 6, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 92, 6, 6, "S");

  drawLabelValue(doc, "Bill To", invoice.customerName || "-", margin + 18, y + 24, 210);
  drawLabelValue(doc, "Phone", invoice.customerPhone || "-", margin + 18, y + 68, 210);
  drawLabelValue(doc, "Invoice No.", invoice.invoiceNo || "-", pageWidth - margin - 210, y + 24, 190);
  drawLabelValue(doc, "Date", invoice.date || "-", pageWidth - margin - 210, y + 68, 190);

  y += 122;
  drawTableHeader(doc, y, margin, pageWidth);
  y += 28;

  invoice.products.forEach((product, index) => {
    const itemTotal = product.quantity * product.price;
    const discountAmount = (itemTotal * product.discount) / 100;
    const taxableAmount = itemTotal - discountAmount;
    const finalAmount = taxableAmount + (taxableAmount * 18) / 100;
    const itemLines = doc.splitTextToSize(product.name || "-", 230);
    const subtitle = productSubtitle(product);
    const rowHeight = Math.max(48, itemLines.length * 12 + (subtitle ? 18 : 4) + 16);

    if (y + rowHeight > pageHeight - 92) {
      drawPageFooter(doc, pageWidth, pageHeight, margin);
      doc.addPage();
      y = 44;
      drawTableHeader(doc, y, margin, pageWidth);
      y += 28;
    }

    doc.setFillColor(index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 250, index % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, contentWidth, rowHeight, "F");
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);

    setFont(doc, "normal", 9, [15, 23, 42]);
    doc.text(String(index + 1), margin + 12, y + 20);
    setFont(doc, "bold", 9.5, [15, 23, 42]);
    doc.text(itemLines, margin + 38, y + 20);

    if (subtitle) {
      setFont(doc, "normal", 7.5, [100, 116, 139]);
      doc.text(doc.splitTextToSize(subtitle, 230), margin + 38, y + 20 + itemLines.length * 12);
    }

    setFont(doc, "normal", 9, [15, 23, 42]);
    doc.text(String(product.quantity), pageWidth - margin - 188, y + 20, { align: "right" });
    doc.text(money(product.price), pageWidth - margin - 126, y + 20, { align: "right" });
    doc.text(product.discount > 0 ? `${product.discount}%` : "-", pageWidth - margin - 70, y + 20, { align: "right" });
    setFont(doc, "bold", 9, [15, 23, 42]);
    doc.text(money(finalAmount), pageWidth - margin - 12, y + 20, { align: "right" });

    y += rowHeight;
  });

  y += 24;
  const summaryWidth = 218;
  const summaryX = pageWidth - margin - summaryWidth;
  const summaryY = y;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(summaryX, summaryY, summaryWidth, 122, 6, 6, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(summaryX, summaryY, summaryWidth, 122, 6, 6, "S");

  const summaryRow = (label: string, value: string, rowY: number, bold = false) => {
    setFont(doc, bold ? "bold" : "normal", bold ? 11 : 9, bold ? [15, 23, 42] : [71, 85, 105]);
    doc.text(label, summaryX + 16, rowY);
    doc.text(value, summaryX + summaryWidth - 16, rowY, { align: "right" });
  };

  summaryRow("Subtotal", money(invoice.subtotal), summaryY + 28);
  summaryRow("GST (18%)", money(invoice.gst), summaryY + 52);
  doc.setDrawColor(203, 213, 225);
  doc.line(summaryX + 16, summaryY + 72, summaryX + summaryWidth - 16, summaryY + 72);
  summaryRow("Total", money(invoice.total), summaryY + 98, true);

  setFont(doc, "bold", 9, [15, 23, 42]);
  doc.text("Payment Notes", margin, summaryY + 10);
  setFont(doc, "normal", 8.5, [71, 85, 105]);
  doc.text(doc.splitTextToSize("Goods once sold will not be taken back. Please verify model, serial number, and color at delivery.", 260), margin, summaryY + 28);

  drawPageFooter(doc, pageWidth, pageHeight, margin);

  const blob = doc.output("blob");
  return new File([blob], `${invoice.invoiceNo || "invoice"}.pdf`, { type: "application/pdf" });
};

export const downloadInvoicePdf = async (invoice: InvoicePdfData) => {
  const file = await createInvoicePdfFile(invoice);
  downloadInvoicePdfFile(file);
};

export const downloadInvoicePdfFile = (file: File) => {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
