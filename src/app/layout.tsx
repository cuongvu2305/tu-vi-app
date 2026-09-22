import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xem Tử Vi Trọn Đời",
  description: "Lập lá số tử vi và luận giải 12 cung theo ngày giờ sinh âm/dương lịch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-black/10 px-4 py-5 text-center text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400">
          Liên hệ xem tử vi:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Đỗ Đức Đạt</span>
          {" — "}
          <a
            href="tel:0768181114"
            className="font-semibold text-amber-700 hover:underline dark:text-amber-500"
          >
            076 8181114
          </a>
          {" · "}
          <a
            href="https://zalo.me/0768181114"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Zalo
          </a>
        </footer>
      </body>
    </html>
  );
}
