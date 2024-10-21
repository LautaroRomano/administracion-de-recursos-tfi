import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import { UserType } from "@/helpers/types";
import { UpdateUser } from "../accounts/update-user";

export const UserDropdown = ({ user }: { user: UserType | null }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("userLogged");
    router.replace("/login");
  }, [router]);

  return (
    <>
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Avatar
              as="button"
              color="secondary"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="User menu actions"
          onAction={(actionKey) => {
            switch (actionKey) {
              case "updateProfile":
                onOpen();
                break;
            }
          }}
        >
          <DropdownItem
            key="profile"
            className="flex flex-col justify-start w-full items-start"
          >
            <p>Iniciaste como</p>
            <p>{user?.name}</p>
          </DropdownItem>
          <DropdownItem
            key="updateProfile"
            className="flex flex-col justify-start w-full items-start"
          >
            <p>Actualizar perfil</p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger"
            onPress={handleLogout}
          >
            Log Out
          </DropdownItem>
          <DropdownItem key="switch">
            <DarkModeSwitch />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {user && (
        <UpdateUser
          user={{
            ...user,
            password: "",
            confirmPassword: "",
            birthDay:""
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
};
