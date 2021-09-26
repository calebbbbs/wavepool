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
  Flex,
  // Button
} from '@chakra-ui/react';

import { UserContext } from '../../contexts/UserContext';
import { gql, useMutation } from "@apollo/client";

import { BiBell } from 'react-icons/bi';

const REMOVE_NOTIFICATION = gql`
 mutation RemoveNotificationMutation($removeNotificationData: RemoveNotificationInput!) {
  removeNotification(data: $removeNotificationData)
}
  `;

const NotifMenu = (props: any) => {
  const { isLoggedIn, userObj, refetch }: any = useContext(UserContext);
  const [removeNotification] = useMutation(REMOVE_NOTIFICATION);

  const list = userObj.notifications.map((e: any, i: number) => {
    return <MenuItem key={i} onClick={() =>{
      removeNotification({
        variables: {
          removeNotificationData: {
            created_at: e.created_at,
            user_id: e.user_id,
          }
        }
      })
      setTimeout(() => refetch(), 500)
    }}>{e.message}</MenuItem>;
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
