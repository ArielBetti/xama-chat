import { useState } from "react";
import '../globals.css';
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Inter } from "@next/font/google";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={`${inter.className} min-h-screen w-screen dark:bg-zinc-900 dark:text-white text-black`} >
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryClientProvider>
  );
}
