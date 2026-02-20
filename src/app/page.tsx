import SalesChart from "@/components/SalesChart";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Biz Dashboard</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}> Panel General </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Ingresos" value="$0" />
        <Card title="Ventas" value="0" />
        <Card title="Clientes" value="0" />
        <Card title="Crecimiento" value="0%" />
      </section>

      <SalesChart />
    </main>
  );
}

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
