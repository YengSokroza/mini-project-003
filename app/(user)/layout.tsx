

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import Loading from "../loading";
import Error from "../error";
import FooterComponent from "@/components/footerComponent";
import SessionWrapper from "../SessionWrapper";
import StoreProvider from "../StoreProvider";
import dynamic from "next/dynamic";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <SessionWrapper >
        <body className="flex justify-between flex-col" >
          <StoreProvider>

            <ErrorBoundary errorComponent={Error}>
              <header>
                <NavbarComponent />
              </header>
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <FooterComponent></FooterComponent>
            </ErrorBoundary>

          </StoreProvider>

        </body>
      </SessionWrapper>



    </html>




  );
}
