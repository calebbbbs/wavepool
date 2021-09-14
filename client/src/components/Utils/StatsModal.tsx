import React, { useContext }from "react";
//import GroupedBar from "../Chartjs/BarChart"
import PieChart from '../Chartjs/PieChart'
//import ScatterChart from '../Chartjs/ScatterPlot'
//import Polar from "../Chartjs/PolarArea"
import { GraphContext } from "../../contexts/GraphContext"

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
  useDisclosure,
  useColorModeValue,
  SimpleGrid,

} from "@chakra-ui/react";

import { AiOutlineBarChart } from "react-icons/ai";

const StatsModal = (props: any) => {
  const { userData, setGraphUserId } = useContext(GraphContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("brand.100", "brand.800");
  // const bg2 = useColorModeValue("brand.50", "brand.900");
  return (
    <>
      <Tooltip label="Charts & Stats">
        <Button variant="ghost" onClick={() => {
          setGraphUserId("124641024");
          onOpen();
        }
          }>
          <chakra.div minW="10px" minH="10px">
            <AiOutlineBarChart />
          </chakra.div>
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>Charts & Stuff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <SimpleGrid p={15} columns={2} bg='#FFFFFF' borderRadius="15px">
                {userData && (userData.map((graphData: any, index: number) => <PieChart graphData={graphData} key={index}/>))}
              </SimpleGrid>
       
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
