import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Hallow-IA",
  description:
    "Hallow-IA es una web donde puedes subir una foto y probarte diferentes disfraces generados por inteligencia artificial",
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
        <div className="old-film-effect">
          <div className="grain-effect" />
          <div className="scratch-lines" />
          <div className="scratch-lines scratch-2" />
          <div className="scratch-lines scratch-3" />
          <div className="flicker" />
          <div className="vignette" />
        </div>
      </body>
    </html>
  );
}
