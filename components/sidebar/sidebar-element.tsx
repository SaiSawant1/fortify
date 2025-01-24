import { ReactNode } from "react";

export const SidebarElement = ({ children }: { children: ReactNode }) => {
  return (
    <li className="font-semibold text-2xl hover:bg-brand_secondary/80 py-1 px-3 rounded-l transition-all ease-in-out cursor-pointer">
      {children}
    </li>
  );
};
