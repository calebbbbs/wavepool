import * as React from "react";
import { useState } from "react";
import axios from "axios";

const GraphContext = React.createContext(undefined as any);

// eslint-disable-next-line react/prop-types
const GraphContextProvider: React.FC = ({ children }) => {
  const [graphUserId, setGraphUserId] = useState<string>();
  const [userData, setUserData] = useState<any>();

  //if (error) console.warn(error);

  const getGraphData = async (user_id: String) => {
    return await axios.get<any>(`/user/analytics/${user_id}`)
      .then(({data}) => {
        setUserData(data); 
      })
  }

  React.useEffect(() => {
    if (graphUserId) {
      getGraphData(graphUserId);
    }
  }, [JSON.stringify(graphUserId)]);

  const graphProps = {
    userData, 
    setUserData,
    graphUserId, 
    setGraphUserId
  };

  return (
    <GraphContext.Provider value={graphProps}>{children}</GraphContext.Provider>
  );
};

export { GraphContext, GraphContextProvider };
