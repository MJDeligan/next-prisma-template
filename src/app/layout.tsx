import SigninButton from "@/components/SigninButton";
import SignoutButton from "@/components/SignoutButton";
import { getSession } from "@/lib/auth";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header className="shadow-md flex">
          <div className="ml-auto flex">
            {session && <SignoutButton />}
            {!session && <SigninButton />}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
