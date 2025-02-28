import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar/Navbar";
// import { UserWrapper } from "@/context/userContext";
import { UserContextProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OPTCG Opts Sim",
  description: "TBD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <Navbar />
          {children}
        </UserContextProvider>
        <footer>
          <p>
            This website is not produced, endorsed, supported, or affiliated
            with Bandai, Bird Studio/Shueisha, Toei Animation or Eiichiro Oda.{" "}
            <br />
            All One Piece related graphical information (including card text) is
            owned by them.
          </p>
        </footer>
      </body>
    </html>
  );
}
