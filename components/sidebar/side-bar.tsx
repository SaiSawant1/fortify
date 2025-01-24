import { ReactNode } from "react";
import { NavBarComponent } from "./navbar-component";

interface SideBardProps {
  children: ReactNode;
}

export const SideBar = ({ children }: SideBardProps) => {
  return (
    <div className="h-full w-full flex text-white">
      <nav className="h-full bg-brand_secondary/80">
        <NavBarComponent />
      </nav>
      <div className="w-full bg-brand_secondary">{children}</div>
    </div>
  );
};
