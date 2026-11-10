import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { title: "Paper Haven — A little more wonder, in every chapter", description: "A considered collection of books for curious minds. Browse Paper Haven's independent bookstore." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><StoreProvider><Navbar/><main>{children}</main><Footer/></StoreProvider></body></html>; }
