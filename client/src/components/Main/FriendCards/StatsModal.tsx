import React from "react";
import GroupedBar from '../../Chartjs/BarChart'
import PieChart from '../../Chartjs/PieChart'
import ScatterChart from '../../Chartjs/ScatterPlot'
import Polar from "../../Chartjs/PolarArea"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  chakra,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tooltip,
  SimpleGrid,
  useDisclosure,
  useColorModeValue,
  Flex,
  Container
} from "@chakra-ui/react";

import { AiOutlineBarChart } from "react-icons/ai";

const StatsModal = (props: any) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("brand.100", "brand.800");

  return (
    <>
      <Tooltip label="Charts & Stats">
        <Button variant="ghost" onClick={onOpen}>
          <chakra.div minW="10px" minH="10px">
            <AiOutlineBarChart />
          </chakra.div>
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}  minW="900px">
          <ModalHeader>Charts & Stuff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <SimpleGrid columns={1} spacing={50} maxW="1000px">
                <Container>
                  <PieChart />
                  <PieChart />
                  <PieChart />
                </Container>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={50} maxW="1000px">
                <GroupedBar />
                <ScatterChart />
                <Polar />
              </SimpleGrid>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" float="right" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StatsModal;
