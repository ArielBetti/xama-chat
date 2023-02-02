import { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Poppins } from "@next/font/google";

const queryClient = new QueryClient();

const inter = Poppins({ subsets: ["latin"], weight: "900" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={inter.className} >
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryClientProvider>
  );
}
