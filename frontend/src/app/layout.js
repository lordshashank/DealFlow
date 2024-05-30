import { Inter, Epilogue } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });
const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata = {
  title: "DealFlow",
  description: "DealFlow is a platform for creating and managing deals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <Providers>
          <UserProvider>
            <Header />
            {children}
            <Footer />
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
