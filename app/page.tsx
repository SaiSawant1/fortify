import { getUserSession } from "@/lib/auth/server";

export default async function Home() {
  const session = await getUserSession();
  console.log(session);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
