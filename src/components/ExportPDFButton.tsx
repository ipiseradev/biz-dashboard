"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Props = {
  targetId: string;     // id del contenedor a exportar
  filename?: string;

  // Branding
  companyName?: string; // Ej: "Ferretería López"
  reportTitle?: string; // Ej: "Reporte de Ventas"
};

export default function ExportPDFButton({
  targetId,
  filename,
  companyName = "Biz",
  reportTitle = "Reporte de Ventas",
}: Props) {
  const [loading, setLoading] = useState(false);

  function drawHeader(pdf: jsPDF, pageW: number) {
    const dateStr = new Date().toLocaleDateString("es-AR");

    // Logo (bloque)
    pdf.setFillColor(17, 24, 39);
    pdf.roundedRect(10, 10, 12, 12, 3, 3, "F");

    // Empresa
    pdf.setTextColor(17, 24, 39);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(companyName, 26, 18);

    // Título
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(reportTitle, 26, 25);

    // Tagline
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 150);
    pdf.text("Generado automáticamente por Biz Dashboard", 26, 30);

    // Fecha (derecha)
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(dateStr, pageW - 10, 18, { align: "right" });

    // Línea separadora
    pdf.setDrawColor(231, 231, 238);
    pdf.line(10, 34, pageW - 10, 34);
  }

  async function exportPDF() {
    const el = document.getElementById(targetId);
    if (!el) return alert(`No se encontró el elemento #${targetId}`);

    setLoading(true);
    try {
      // Captura del contenido (solo el "report")
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
      });

      const imgData = canvas.toDataURL("image/png");

      // PDF A4 (mm)
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // Márgenes / header
      const marginX = 10;
      const headerH = 42; // más grande (PRO)
      const bottomMargin = 10;

      const contentW = pageW - marginX * 2;
      const contentH = pageH - headerH - bottomMargin;

      const imgProps = pdf.getImageProperties(imgData);
      const imgH = (imgProps.height * contentW) / imgProps.width;

      // Página 1
      drawHeader(pdf, pageW);
      pdf.addImage(imgData, "PNG", marginX, headerH, contentW, imgH);

      // Paginación: vamos “desplazando” la imagen
      let heightLeft = imgH - contentH;

      while (heightLeft > 0) {
        pdf.addPage();
        drawHeader(pdf, pageW);

        const offsetY = headerH - (imgH - heightLeft);
        pdf.addImage(imgData, "PNG", marginX, offsetY, contentW, imgH);

        heightLeft -= contentH;
      }

      const safeCompany = companyName.replace(/[^\w\s-]/g, "").trim() || "Biz";
      const name =
        filename || `reporte-${safeCompany}-${new Date().toISOString().slice(0, 10)}.pdf`;

      pdf.save(name);
    } catch (e) {
      console.error(e);
      alert("No se pudo generar el PDF. Mirá la consola para más detalle.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={exportPDF}
      disabled={loading}
      className="btn btn-primary"
      title="Exportar reporte a PDF"
    >
      {loading ? "Generando..." : "Exportar PDF"}
    </button>
  );
}
