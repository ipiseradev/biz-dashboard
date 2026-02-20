import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "system-ui" }}>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ flex: 1, padding: 24, background: "#f3f4f6" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
