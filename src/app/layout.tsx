import type { Metadata, Viewport } from "next";
import { DM_Sans, Gilda_Display } from "next/font/google";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const gilda = Gilda_Display({ subsets: ["latin"], weight: "400", variable: "--font-gilda" });

export const metadata: Metadata = {
  title: "Morada Lagos | Aluguel de imóveis na Região dos Lagos",
  description:
    "Imóveis selecionados para alugar em Búzios, Cabo Frio, Arraial do Cabo e em toda a Região dos Lagos.",
};

export const viewport: Viewport = {
  themeColor: "#073B4C",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${gilda.variable}`}>
      <body>
        {/* Um favorito inicial, como no layout de referência. */}
        <FavoritesProvider initialFavorites={["3"]}>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
