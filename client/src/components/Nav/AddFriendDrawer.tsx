import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Button,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";

function AddFriendDrawer() {
  const [newFriendInput, setNewFriendInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <AddIcon/>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Friend</DrawerHeader>

          <DrawerBody>
            <Input
              value={newFriendInput}
              onChange={(e) => {
                setNewFriendInput(e.target.value);
              }}
              placeholder="Type here..."
            />


            
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">New Friend</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddFriendDrawer;
