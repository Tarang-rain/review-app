import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geist = Geist({
	variable: "--font-geist",
	weight: ["500", "600", "700", "800", "800", "400"],
	fallback: ["system-ui", "arial"],
	subsets: ["latin"],
});
export const metadata: Metadata = {
	title: "Testimonial App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geist.className} antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
