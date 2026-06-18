import { useEffect, useState } from "react";

export default function Toast() {
  return null;
  // const [msg, setMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const fact = await getFact();
  //     setMsg(fact?.text || null);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     setMsg(null);
  //   }, 1500);
  //   return () => clearInterval(interval);
  // }, []);
  // if (!msg) return null;

  // return (
  //   <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
  //     {msg}
  //   </div>
  // );
}

async function getFact() {
  try {
    const res = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en",
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
