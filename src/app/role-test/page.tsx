"use client";
import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";

const RoleTest = () => {
  const [status, setStatus] = useState<number | null>(null);
  useEffect(() => {
    const data = fetch("http://localhost:3000/api/role-test", {
      method: "POST",
      credentials: "same-origin",
    }).then((res) => {
      setStatus(res.status);
    });
  });
  if (status === 403)
    return (
      <div className="h-screen w-screen flex items-center justify-center font-bold text-3xl">
        <div>Must be admin to access</div>
      </div>
    );
  return <div>Authenticated as admin</div>;
};

export default RoleTest;
