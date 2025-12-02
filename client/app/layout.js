import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "CP-Universe",
  description: "The Unified Universe for Competitive Programmers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
