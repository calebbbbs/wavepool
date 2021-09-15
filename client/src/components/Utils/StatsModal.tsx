import React, { useContext }from "react";
import GroupedBar from "../Chartjs/BarChart"
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
  const { user_id, userName} = props;

  const { userGenres, userArtists, userFriends, setGraphUserId } = useContext(GraphContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("brand.100", "brand.800");
  // const bg2 = useColorModeValue("brand.50", "brand.900");
  return (
    <>
      <Tooltip label="Charts & Stats">
        <Button variant="ghost" onClick={() => {
          setGraphUserId(user_id);
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
        <ModalContent bg={bg} minW="600">
          <ModalHeader>Charts & Stuff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <SimpleGrid p={15} columns={1} bg='#FFFFFF' borderRadius="15px">
                {userGenres && (<PieChart graphData={userGenres} graphName={'genres'} userName={userName} key={1}/>)}
                {userArtists && (<PieChart graphData={userArtists} graphName={'artists'} userName={userName} key={2}/>)}
                {userFriends && (<GroupedBar graphData={userFriends} graphName={'friends'} userName={userName} key={3}/>)}
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
