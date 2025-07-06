// src/components/Navbar.tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom"

const isActiveClassName = ({ isActive }: any) => isActive ? " text-white rounded underline" : "text-muted-foreground"


const Navbar = () => {
  return (
    <nav className="p-4 border-b">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href={import.meta.env.BASE_URL}>
              <b>CannData</b>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink
                to="/strains"
                className={isActiveClassName}>
                Strains
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink
                to="/products"
                className={isActiveClassName}>
                Products
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink
                to="/reports"
                className={isActiveClassName}>
                Reports
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

export default Navbar
