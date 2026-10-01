import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Showcase Ekskul TIK | Karya Anak-Anak",
  description:
    "Galeri digital karya interaktif, biodata, game, dan toko online buatan anak-anak Ekskul TIK.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
