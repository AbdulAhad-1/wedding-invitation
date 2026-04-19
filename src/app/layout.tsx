import type { Metadata } from "next";
import "./globals.css";
import { WeddingProvider } from "../hooks/use-wedding";

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Wedding Invitation of Wahyu and Riski",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sacramento&family=Josefin+Sans:wght@300;400&family=Noto+Naskh+Arabic&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js" defer />
      </head>
      <body>
        <WeddingProvider audioUrl="/music/pure-love-304010.mp3">{children}</WeddingProvider>
      </body>
    </html>
  );
}
