"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Props = {
  targetId: string;            // id del contenedor a exportar
  filename?: string;

  // Branding
  companyName?: string;        // Ej: "Ferretería López"
  reportTitle?: string;        // Ej: "Reporte de Ventas"
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

    // “Logo” simple (bloque)
    pdf.setFillColor(17, 24, 39);
    pdf.roundedRect(10, 10, 10, 10, 2, 2, "F");

    // Empresa
    pdf.setTextColor(17, 24, 39);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(companyName, 24, 17);

    // Título
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(107, 114, 128);
    pdf.text(reportTitle, 24, 22);

    // Fecha a la derecha
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(dateStr, pageW - 10, 17, { align: "right" });

    // Línea separadora
    pdf.setDrawColor(231, 231, 238);
    pdf.line(10, 28, pageW - 10, 28);
  }

  async function exportPDF() {
    const el = document.getElementById(targetId);
    if (!el) return alert(`No se encontró el elemento #${targetId}`);

    setLoading(true);
    try {
      // Captura del contenido (solo el report, sin header)
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      const headerH = 32; // mm (espacio para el header)
      const marginX = 10; // mm
      const contentW = pageW - marginX * 2;
      const contentH = pageH - headerH - 10; // bottom margin 10

      const imgProps = pdf.getImageProperties(imgData);
      const imgH = (imgProps.height * contentW) / imgProps.width;

      // Header (página 1)
      drawHeader(pdf, pageW);

      // Colocar imagen del report debajo del header
      let y = headerH;
      pdf.addImage(imgData, "PNG", marginX, y, contentW, imgH);

      // Si el contenido excede una página, “slice” con offset
      let heightLeft = imgH - contentH;

      while (heightLeft > 0) {
        pdf.addPage();
        drawHeader(pdf, pageW);

        // Movemos la imagen hacia arriba para mostrar la siguiente “sección”
        const offsetY = headerH - (imgH - heightLeft);
        pdf.addImage(imgData, "PNG", marginX, offsetY, contentW, imgH);

        heightLeft -= contentH;
      }

      const name =
        filename || `reporte-${companyName}-${new Date().toISOString().slice(0, 10)}.pdf`;

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
