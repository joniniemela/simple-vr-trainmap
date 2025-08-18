import React from "react";
import {ModeToggle} from "@/components/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function Header() {
  return (
    <div className={"flex flex-row items-center justify-between m-8"}>
      <h1 className={"font-bold text-4xl text-center"}><Link href={"/"}>VR Trains</Link></h1>
      <div className={"flex flex-row items-center gap-4"}>
        <NavigationMenu>
          <NavigationMenuLink asChild><Link href={"/"}>Map</Link></NavigationMenuLink>
          <NavigationMenuLink asChild><Link href={"/timetables"}>Timetables</Link></NavigationMenuLink>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </div>
  )
}