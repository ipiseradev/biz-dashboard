"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Props = {
  targetId: string; // id del contenedor a exportar
  filename?: string;
};

export default function ExportPDFButton({ targetId, filename }: Props) {
  const [loading, setLoading] = useState(false);

  async function exportPDF() {
    const el = document.getElementById(targetId);
    if (!el) return alert(`No se encontró el elemento #${targetId}`);

    setLoading(true);
    try {
      // Captura a imagen
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

      // Pasar pixeles->mm manteniendo aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const imgW = pageW;
      const imgH = (imgProps.height * imgW) / imgProps.width;

      let y = 0;
      let heightLeft = imgH;

      pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
      heightLeft -= pageH;

      while (heightLeft > 0) {
        pdf.addPage();
        y = -(imgH - heightLeft);
        pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
        heightLeft -= pageH;
      }

      const name =
        filename ||
        `biz-dashboard-${new Date().toISOString().slice(0, 10)}.pdf`;

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
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid #111",
        cursor: loading ? "not-allowed" : "pointer",
        background: loading ? "#333" : "black",
        color: "white",
        opacity: loading ? 0.8 : 1,
      }}
      title="Exportar reporte a PDF"
    >
      {loading ? "Generando..." : "Exportar PDF"}
    </button>
  );
}
