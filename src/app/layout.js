import { Exo } from "next/font/google";
import "./globals.css";
import Nav from "./layouts/nav";

const exo = Exo({ subsets: ["latin"] });

export const metadata = {
  title: "Miragro",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="Hu">
      <body className={exo.className}>
        <Nav />
        {children}
        </body>
    </html>
  );
}
