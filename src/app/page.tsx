import { getSession } from "@/lib/auth";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      <Link href="/profile">About</Link>
      <div>{JSON.stringify(session)}</div>
    </main>
  );
}
