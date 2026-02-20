"use client";

import { useEffect, useState } from "react";
import SalesChart from "@/components/SalesChart";
import RecentSalesTable from "@/components/RecentSalesTable";
import { calcMetrics } from "@/lib/metrics";
import ExportPDFButton from "@/components/ExportPDFButton";

const STORAGE_KEY = "biz-sales";

export default function Home() {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    salesCount: 0,
    clients: 0,
  });

  function refreshMetrics() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    setMetrics(calcMetrics(parsed));
  }

  useEffect(() => {
    refreshMetrics();

    const onUpdated = () => refreshMetrics();
    window.addEventListener("biz-sales-updated", onUpdated);

    return () => window.removeEventListener("biz-sales-updated", onUpdated);
  }, []);

  function formatARS(value: number) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div>
          <h1 className="h1">Dashboard</h1>
          <p className="sub"></p>
        </div>

        <ExportPDFButton
        targetId="report"
        companyName="Biz"
        reportTitle="Reporte de Ventas"
        />
      
        </div>


      <div id="report" style={{ display: "grid", gap: 16 }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          <Kpi title="Ingresos Por Venta" value={formatARS(metrics.revenue)} />
          <Kpi title="Ventas Realizadas" value={String(metrics.salesCount)} />
          <Kpi title="Clientes Activos" value={String(metrics.clients)} />
          <Kpi title="Crecimiento Mensual" value="—" />
        </section>

        <div className="card card-pad">
          <SalesChart />
        </div>

        <RecentSalesTable />
      </div>
    </main>
  );
}

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="card card-pad">
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>
        {value}
      </div>
    </div>
  );
}
