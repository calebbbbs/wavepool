import React, { useContext } from "react";
import {
  chakra,
  Menu,
  MenuButton,
  // MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { UserContext } from "../../contexts/UserContext";

import { BiBell } from "react-icons/bi";


const NotifMenu = (props: any) => {
  const { isLoggedIn }: any = useContext(UserContext);

return(
<Menu>
<MenuButton
  m={4}
  as={IconButton}
  aria-label="Options"
  icon={<BiBell />}
  variant="ghost"
/>
<MenuList
  bg={useColorModeValue("brand.50", "brand.900")}
  zIndex={2}
>
  <MenuGroup>
    {isLoggedIn && (
      <chakra.div>
        {/* <MenuItem>
        </MenuItem>
        <MenuItem>

        </MenuItem>
        <MenuItem>

        </MenuItem>
        <MenuItem>

        </MenuItem>
        <MenuItem>
        </MenuItem> */}
      </chakra.div>
    )}
  </MenuGroup>
  <MenuDivider />
  <MenuGroup>
  </MenuGroup>
</MenuList>
</Menu>
);
};
export default NotifMenu;