import { Separator } from "@/components/ui/separator";

export const NavBarComponent = () => {
  return (
    <div className="p-4">
      <div>
        <h1 className="font-bold text-3xl hover:bg-brand_secondary/80 rounded transition-all ease-in p-2">
          FORTIFY
        </h1>
      </div>
      <Separator />
      <div>
        <ul>
          <li>Vault</li>
          <li>Tools</li>
          <li>Setting</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};
