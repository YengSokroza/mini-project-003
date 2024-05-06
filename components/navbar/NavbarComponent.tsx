'use client'

import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import logo from "@/public/hupe.svg"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuList } from "./menu";
import { CartIcon } from "@/components/icons/iconsCustomize"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectProducts
} from "@/redux/features/cart/cartSlice";

import { CartProductType } from "@/lib/definitions";
import { useDispatch } from "react-redux";
import { useSession , signOut} from "next-auth/react";

import { selectAvatar, selectBio } from "@/redux/features/userProfile/userProfileSlice";
import { selectToken } from "@/redux/features/auth/authSlice";
import { fetchUserProfile } from "@/redux/features/userProfile/userProfileSlice";
import { log } from "console";



type MenuItem = {
  name: string;
  path: string;
  active: boolean;
};

export default function NavbarComponent() {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.userProfile.userProfile);

  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  console.log("userProfile: ", userProfile?.avatar);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuItem[]>(MenuList);

  const router = useRouter();
  const handleCart = () => router.push('/cart');

  //For Carts
  const products = useAppSelector(selectProducts);

  //display number of product that only unique select
  const [uniqueProducts, setUniqueProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    // Filter unique products based on their IDs
    const unique = products.filter((product, index, self) =>
      index === self.findIndex((t) => (
        t.id === product.id
      ))
    );

    // Update the state with the unique products
    setUniqueProducts(unique);

  }, [products]);


  const { data: session } = useSession();

  const token = useAppSelector(selectToken);
  console.log("token: ", token);

  const handleLogout = async () => {
		fetch(process.env.NEXT_PUBLIC_API_URL + "/logout", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Data from logout : ", data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

  if (!session) {
    return (
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="z-50 fixed text-foreground bg-slate-50 border-0 "
      >
        <NavbarContent className="sm:hidden z-40" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        {/* logo */}
        <NavbarContent className="sm:hidden z-40" justify="end">
          <NavbarBrand>

            <Image src={logo} width={50} height={50} alt="logo" />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 " justify="center">
          <NavbarBrand>
            <Image src={logo} width={60} height={50} alt="logo" />

          </NavbarBrand>
          {menu.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full font-semibold text-black-10 "
                href={item.path}
                size="md"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}

        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <NavbarItem className="flex items-center md:space-x-4 space-x-2">


            <div className=" relative  ">
              <CartIcon color="#353534" classname="w-7 h-7 hover:cursor-pointer" onClick={handleCart} />
              <div className="bg-yellow-10 w-5 h-5 text-xs flex justify-center items-center absolute rounded-full -top-2 -right-2" >{uniqueProducts.length}</div>
            </div>




            <Button as={Link} className="bg-yellow-10 font-semibold" href="/auth/login" variant="flat">
              Login
            </Button>

          </NavbarItem>
        </NavbarContent>

        <NavbarMenu >
          {menu.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full font-semibold text-black-10"
                color={
                  item.path === pathname ? "warning" : "foreground"
                }
                href={item.path}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="z-50 fixed text-foreground bg-slate-50 border-0 "
    >
      <NavbarContent className="sm:hidden z-40" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* logo */}
      <NavbarContent className="sm:hidden z-40" justify="end">
        <NavbarBrand>

          <Image src={logo} width={50} height={50} alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarBrand>
          <Image src={logo} width={60} height={50} alt="logo" />

        </NavbarBrand>
        {menu.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full font-semibold text-black-10 "
              href={item.path}
              size="md"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}

      </NavbarContent>


      {/* this is avatar profile */}
      <NavbarContent as="div" justify="end">
        <div className=" relative mr-4 ">
          <CartIcon color="#353534" classname="w-7 h-7 hover:cursor-pointer" onClick={handleCart} />
          <div className="bg-yellow-10 w-5 h-5 text-xs flex justify-center items-center absolute rounded-full -top-2 -right-2" >{uniqueProducts.length}</div>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={session.user?.image as string || "https://cdn1.iconfinder.com/data/icons/project-management-8/500/worker-512.png"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session.user?.email}</p>
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={() => {signOut() , handleLogout}}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu >
        {menu.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full font-semibold text-black-10"
              color={
                item.path === pathname ? "warning" : "foreground"
              }
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
