"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Point = { month: string; revenue: number };

const STORAGE_KEY = "biz-sales";

function buildChartData(): Point[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const sales = JSON.parse(stored);

  const map: Record<string, number> = {};
  for (const s of sales) {
    if (!s?.date) continue;
    const month = String(s.date).slice(0, 7); // YYYY-MM
    const amount = Number(s.amount || 0);
    map[month] = (map[month] || 0) + amount;
  }

  return Object.entries(map)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([month, revenue]) => ({ month, revenue }));
}

export default function SalesChart() {
  const [data, setData] = useState<Point[]>([]);

  useEffect(() => {
    const refresh = () => setData(buildChartData());

    refresh();

    // actualizar cuando cambian ventas
    window.addEventListener("biz-sales-updated", refresh);
    return () => window.removeEventListener("biz-sales-updated", refresh);
  }, []);

  return (
    <div
      style={{
        marginTop: 24,
        background: "white",
        padding: 20,
        borderRadius: 14,
        border: "1px solid #e5e5e5",
      }}
    >
      <h3 style={{ marginBottom: 12 }}>Ingresos por mes</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#000000" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
