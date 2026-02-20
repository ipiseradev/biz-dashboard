"use client";

import { useMemo, useState } from "react";
import type { RecentSale } from "@/data/recentSales";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (sale: RecentSale) => void;
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function AddSaleModal({ open, onClose, onCreate }: Props) {
  const defaultDate = useMemo(() => todayISO(), []);
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState(defaultDate);
  const [status, setStatus] = useState<RecentSale["status"]>("Pendiente");
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  function reset() {
    setCustomer("");
    setAmount("");
    setDate(todayISO());
    setStatus("Pendiente");
    setError(null);
  }

  function close() {
    reset();
    onClose();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const c = customer.trim();
    if (!c) return setError("Ingresá un cliente.");

    const a = Number(amount);
    if (!amount || Number.isNaN(a) || a <= 0) return setError("Monto inválido.");

    const d = (date || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return setError("Fecha inválida (YYYY-MM-DD).");

    const sale: RecentSale = {
      id: "FV-" + Math.floor(Math.random() * 10000),
      customer: c,
      amount: a,
      date: d,
      status,
    };

    onCreate(sale);
    close();
  }

  return (
    <div
      onMouseDown={close}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 100%)",
          background: "white",
          borderRadius: 14,
          border: "1px solid #e5e5e5",
          padding: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <h3 style={{ margin: 0 }}>Nueva venta</h3>
          <button
            onClick={close}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: "6px 10px",
              cursor: "pointer",
              background: "white",
            }}
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, opacity: 0.7 }}>Cliente</label>
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Ej: Ferretería López"
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.7 }}>Monto</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ej: 50000"
                inputMode="numeric"
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.7 }}>Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, opacity: 0.7 }}>Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as RecentSale["status"])}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "white",
                outline: "none",
              }}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
              <option value="Vencido">Vencido</option>
            </select>
          </div>

          {error && (
            <div
              style={{
                border: "1px solid #f3c4c4",
                background: "#fff5f5",
                padding: 10,
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              onClick={close}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                background: "white",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                border: "1px solid #111",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                background: "black",
                color: "white",
              }}
            >
              Guardar venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
