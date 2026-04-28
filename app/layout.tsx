import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Do NOT put UI components here if you want them separated */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}