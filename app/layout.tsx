import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { title: "Wisdombridge Library — A little more wonder, in every chapter", description: "A considered collection of books for curious minds at Wisdombridge Library.", icons: { icon: "/brand/wisdombridge-logo.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><StoreProvider><Navbar/><main>{children}</main><Footer/></StoreProvider></body></html>; }
