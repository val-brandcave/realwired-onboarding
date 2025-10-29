import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { OnboardingProvider } from "@/lib/onboarding-context";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YouConnect Onboarding",
  description: "Guided onboarding experience for YouConnect bank configuration",
  icons: {
    icon: "/realwired-logo.png",
    apple: "/realwired-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${montserrat.variable} antialiased bg-background text-foreground`}
      >
        <OnboardingProvider>
          {children}
        </OnboardingProvider>
      </body>
    </html>
  );
}
