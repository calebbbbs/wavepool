import React, { useContext } from 'react';
import {
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  IconButton,
  useColorModeValue,
  Flex
} from '@chakra-ui/react';

import { UserContext } from '../../contexts/UserContext';

import { BiBell } from 'react-icons/bi';

const NotifMenu = (props: any) => {
  const { isLoggedIn, userObj }: any = useContext(UserContext);

  const list = userObj.notifications.map((e: any, i: number) => {
    return <MenuItem key={i}>{e.message}</MenuItem>;
  }).reverse();
    return (
      <Menu>

        <MenuButton
          m={4}
          as={IconButton}
          aria-label='Options'
          icon={<BiBell />}
          variant='ghost'
        />
        <MenuList bg={useColorModeValue('brand.50', 'brand.900')} zIndex={2}>
          <MenuGroup>
            <Flex>
            <chakra.div m={2}>Notifications</chakra.div>
            </Flex>
            <MenuDivider />
            {isLoggedIn && (
              <chakra.div>
                {list}
              </chakra.div>
            )}
          </MenuGroup>
          {/* <MenuDivider /> */}
          <MenuGroup></MenuGroup>
        </MenuList>
      </Menu>
    );
  };
export default NotifMenu;
