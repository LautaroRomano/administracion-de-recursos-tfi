import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { UserType } from "@/helpers/types";
import { RiProductHuntFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaHammer } from "react-icons/fa6";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";

export const SidebarWrapper = ({ user }: { user: UserType | null }) => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  const userItem = localStorage.getItem("userLogged");
  const userLogged = userItem ? JSON.parse(userItem) : null;

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Menu Administrador">
              <SidebarItem
                disabled={!userLogged || userLogged.role !== "administrador"}
                isActive={pathname === "/proveedores"}
                title="Proveedores"
                icon={<RiProductHuntFill size={24} color="#717171" />}
                href="proveedores"
              />
              <SidebarItem
                disabled={!userLogged || userLogged.role !== "administrador"}
                isActive={pathname === "/usuarios"}
                title="Usuarios"
                icon={<FaUser size={18} color="#717171" />}
                href="usuarios"
              />
              <SidebarItem
                disabled={!userLogged || userLogged.role !== "administrador"}
                isActive={pathname === "/interacciones"}
                title="Historial interacciones"
                icon={<FaHistory size={18} color="#717171" />}
                href="interacciones"
              />
            </SidebarMenu>
            <SidebarMenu title="Menu RRHH">
              <SidebarItem
                disabled={
                  !userLogged ||
                  !(userLogged.role === "empleado" && userLogged.area === "RRHH")
                }
                isActive={pathname === "/trabajadores"}
                title="Trabajadores (app)"
                icon={<FaHammer size={24} color="#717171" />}
                href="/trabajadores"
              />
              <SidebarItem
                disabled={
                  !userLogged ||
                  !(userLogged.role === "empleado" && userLogged.area === "RRHH")
                }
                isActive={pathname === "/empleados"}
                title="Empleados (empresa)"
                icon={<PiBagSimpleFill  size={24} color="#717171" />}
                href="/empleados"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
