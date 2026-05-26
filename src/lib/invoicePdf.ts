import { jsPDF } from "jspdf";

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

const money = (amount: number) => `Rs. ${amount.toFixed(2)}`;

const productSubtitle = (product: InvoiceProduct) =>
  [
    product.model ? `Model: ${product.model}` : "",
    product.serialNumber ? `Serial: ${product.serialNumber}` : "",
    product.color ? `Color: ${product.color}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

export const createInvoicePdfFile = (invoice: InvoicePdfData) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 36;
  let y = 40;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("TAX INVOICE", pageWidth / 2, y, { align: "center" });

  y += 28;
  doc.setFontSize(16);
  doc.text("HARI COLLECTION", pageWidth / 2, y, { align: "center" });
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Shop No. 2068, 2nd Floor, Nathani Heights, Commercial Arcade, Bellasis Road, Mumbai-400008", pageWidth / 2, y, {
    align: "center",
  });
  y += 14;
  doc.text("Phone: 9967441689 | GSTIN: 27BDMPA9576PIZM | State: Maharashtra", pageWidth / 2, y, { align: "center" });

  y += 26;
  doc.setDrawColor(30);
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Bill To", margin, y);
  doc.text("Invoice Details", pageWidth - margin - 150, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.text(invoice.customerName || "-", margin, y);
  doc.text(`Invoice No: ${invoice.invoiceNo}`, pageWidth - margin - 150, y);
  y += 14;
  doc.text(`Phone: ${invoice.customerPhone || "-"}`, margin, y);
  doc.text(`Date: ${invoice.date}`, pageWidth - margin - 150, y);

  y += 28;
  doc.setFont("helvetica", "bold");
  doc.text("#", margin, y);
  doc.text("Item", margin + 24, y);
  doc.text("Qty", pageWidth - margin - 190, y);
  doc.text("Rate", pageWidth - margin - 150, y);
  doc.text("Disc", pageWidth - margin - 95, y);
  doc.text("Amount", pageWidth - margin - 45, y, { align: "right" });
  y += 8;
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  invoice.products.forEach((product, index) => {
    const itemTotal = product.quantity * product.price;
    const discountAmount = (itemTotal * product.discount) / 100;
    const finalAmount = itemTotal - discountAmount + ((itemTotal - discountAmount) * 18) / 100;
    const itemLines = doc.splitTextToSize(product.name || "-", pageWidth - margin * 2 - 230);
    const subtitle = productSubtitle(product);

    if (y > 730) {
      doc.addPage();
      y = 40;
    }

    doc.setFont("helvetica", "normal");
    doc.text(String(index + 1), margin, y);
    doc.text(itemLines, margin + 24, y);
    doc.text(String(product.quantity), pageWidth - margin - 190, y);
    doc.text(money(product.price), pageWidth - margin - 150, y);
    doc.text(`${product.discount}%`, pageWidth - margin - 95, y);
    doc.text(money(finalAmount), pageWidth - margin - 45, y, { align: "right" });

    y += Math.max(itemLines.length * 12, 14);
    if (subtitle) {
      doc.setFontSize(8);
      doc.setTextColor(90);
      doc.text(subtitle, margin + 24, y);
      doc.setTextColor(0);
      doc.setFontSize(10);
      y += 12;
    }
    y += 8;
  });

  y += 8;
  doc.line(margin, y, pageWidth - margin, y);
  y += 18;

  const summaryX = pageWidth - margin - 170;
  doc.text("Subtotal:", summaryX, y);
  doc.text(money(invoice.subtotal), pageWidth - margin, y, { align: "right" });
  y += 16;
  doc.text("GST (18%):", summaryX, y);
  doc.text(money(invoice.gst), pageWidth - margin, y, { align: "right" });
  y += 18;
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", summaryX, y);
  doc.text(money(invoice.total), pageWidth - margin, y, { align: "right" });

  y += 48;
  doc.setFont("helvetica", "normal");
  doc.text("For: Hari Collection", margin, y);
  doc.text("Authorized Signatory", pageWidth - margin - 110, y);

  const blob = doc.output("blob");
  return new File([blob], `${invoice.invoiceNo || "invoice"}.pdf`, { type: "application/pdf" });
};

export const downloadInvoicePdf = (invoice: InvoicePdfData) => {
  const file = createInvoicePdfFile(invoice);
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
