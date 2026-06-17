import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import Toast from "@/components/Toast";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbar = router.pathname === "/404";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Toast />
      <Component {...pageProps} />
    </>
  );
}
