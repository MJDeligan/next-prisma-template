import { getSession } from "@/lib/auth";
import Image from "next/image";

async function Profile() {
  const session = await getSession();
  return (
    <div className="p-8">
      <div className="text-center w-fit">
        {session?.user?.image && (
          <Image
            className="rounded-full mb-2 mx-auto"
            src={session.user.image}
            alt="Profile picture"
            width={100}
            height={100}
          />
        )}
        {session?.user?.name && (
          <span className="block font-medium">{session.user.name}</span>
        )}
        {session?.user?.email && <span>({session.user.email})</span>}
      </div>
    </div>
  );
}

export default Profile;
