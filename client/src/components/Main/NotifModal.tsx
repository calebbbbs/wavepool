import React from 'react';
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Button,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import moment from 'moment';

const NotifModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('brand.100', 'brand.800');
  const bg2 = useColorModeValue('brand.50', 'brand.900');

  const { notifs } = props;
  const notifArray = [...notifs];
  const list = notifArray
    .sort((a: any, b: any) => {
      return (
        new Date(b.timestampp).getTime() - new Date(a.timestampp).getTime()
      );
    })
    .map((e: any, i: number) => {
      return (
        <Box key={i} mt={4} mb={4} p={8} bg={bg2} borderRadius={'2vh'}>
          <Flex>
            <Image
              boxSize='2rem'
              borderRadius='full'
              src={e.photo}
              alt='friend profile picture'
              mr='12px'
            />
            <Text fontSize='lg' minWidth={'330px'}>
              {e.message}
            </Text>
            <Spacer />
            <Text as='i' fontSize='xs' align='right'>
              {moment(new Date(e.timestampp)).fromNow()}
            </Text>
          </Flex>
        </Box>
      );
    });

  return (
    <>
      <Button variant='ghost' aria-label='see more' onClick={onOpen}>
        See More
      </Button>

      <Modal
        scrollBehavior='inside'
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size='3xl'
        colorScheme='brand'
      >
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>Notifications</ModalHeader>
          <ModalBody
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: useColorModeValue('brand.400', 'brand.900'),
                borderRadius: '24px',
              },
            }}
          >
            {list}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
              }}
            ></Button>
            <ModalCloseButton />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotifModal;
