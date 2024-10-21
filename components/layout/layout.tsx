"use client";

import { useEffect, useState } from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [user, setUser] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  useEffect(() => {
    const user = localStorage.getItem("userLogged");
    if (user) {
      const userJSON = JSON.parse(user);
      if (!userJSON.id) router.replace("/login");
      else setUser(userJSON);
    }
    return () => {};
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}>
      <section className='flex'>
        <SidebarWrapper user={user}/>
        <NavbarWrapper user={user}>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
