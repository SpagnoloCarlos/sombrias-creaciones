import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import OldEffect from "@/components/OldEffect";

export const metadata: Metadata = {
  title: "SombrIAs Creaciones",
  description:
    "SombrIAs Creaciones es una web donde puedes subir una foto y probarte diferentes disfraces generados por inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <OldEffect />
      </body>
    </html>
  );
}
