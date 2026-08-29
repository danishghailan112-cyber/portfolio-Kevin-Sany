import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "SanyVisual — Photographer & Videographer",
  description:
    "Portfolio of Muhammad Kevin Sany — photographer and videographer specializing in event documentation, stage photography, and short film production.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
