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
  Link,
  useDisclosure,
  // useBreakpointValue
  // Button
} from '@chakra-ui/react';

import { UserContext } from '../../contexts/UserContext';
import { gql, useMutation } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import { BiBell } from 'react-icons/bi';



const REMOVE_NOTIFICATION = gql`
 mutation RemoveNotificationMutation($removeNotificationData: RemoveNotificationInput!) {
  removeNotification(data: $removeNotificationData)
}
  `;

const NotifMenu = (props: any) => {
  const { isLoggedIn, userObj, refetch }: any = useContext(UserContext);
  const [removeNotification] = useMutation(REMOVE_NOTIFICATION);
  const { onOpen, onClose } = useDisclosure();
  // const opts = { base: 2, sm: 3, md: 3, lg: 3, xl: 6 }
  // const tracksPerPage = useBreakpointValue(opts) || 2;
  const list = userObj.notifications.map((e: any, i: number) => {
    return <MenuItem key={i} closeOnSelect={false} onClick={() =>{
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
          onClick={onOpen}
        />
        <MenuList bg={useColorModeValue('brand.50', 'brand.900')} zIndex={2}>
          <MenuGroup>
            <Flex justifyContent="space-between" >
            <chakra.div m={2}>Notifications</chakra.div>
            <Flex>
              <MenuItem onClick={onClose}><CloseIcon />
              </MenuItem>
              </Flex>
            </Flex>
            <MenuDivider />
            {isLoggedIn && (
              <chakra.div>
                {list}
              </chakra.div>
            )}

            {isLoggedIn && userObj.notifications.length > 0 && (<Link m={2}>See More</Link>)}
          </MenuGroup>
          {/* <MenuDivider /> */}
          <MenuGroup></MenuGroup>
        </MenuList>
      </Menu>
    );
  };
export default NotifMenu;
