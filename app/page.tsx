import { TestComponent } from "@/components/test-component";
import { getUserSession } from "@/lib/auth/server";

export default async function Home() {
  const session = await getUserSession();
  return (
    <div>
      <h1>Home</h1>
      <div>server session :{session?.name}</div>
      <TestComponent />
    </div>
  );
}
