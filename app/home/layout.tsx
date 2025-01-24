import { SideBar } from "@/components/sidebar/side-bar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideBar>{children}</SideBar>;
}
