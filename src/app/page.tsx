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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1>Biz Dashboard</h1>
        <p>Panel General</p>
      </div>

      <ExportPDFButton targetId="report" />
    </div>

    <div id="report" style={{ paddingTop: 12 }}>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 20 }}>
        ...
      </section>

      <SalesChart />
      <RecentSalesTable />
    </div>
  </main>
);

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 14,
        padding: 16,
        background: "white",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
