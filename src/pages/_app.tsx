import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import Toast from "@/components/Toast";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const hideNavbar = router.pathname === "/404";

  return (
    <>
      <SessionProvider session={session}>
        {!hideNavbar && <NavBar />}
        <Toast />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
