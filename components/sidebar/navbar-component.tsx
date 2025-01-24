import { Separator } from "@/components/ui/separator";
import { SidebarElement } from "./sidebar-element";
import Link from "next/link";

export const NavBarComponent = () => {
  return (
    <div>
      <div className="p-4">
        <h1 className="font-bold text-3xl hover:bg-brand_secondary/80 rounded transition-all ease-in p-2">
          FORTIFY
        </h1>
      </div>
      <Separator className="bg-brand_primary" />
      <div className="my-5">
        <ul className="pl-4">
          <SidebarElement>
            <Link href={"/home/vault"}>Vault</Link>
          </SidebarElement>
          <SidebarElement>
            <Link href={"/home/tools"}>Tools</Link>
          </SidebarElement>
          <SidebarElement>
            <Link href={"/home/settings"}>Settings</Link>
          </SidebarElement>
        </ul>
      </div>
      <div></div>
    </div>
  );
};
