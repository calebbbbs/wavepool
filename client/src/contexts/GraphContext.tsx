import * as React from "react";
import { useState } from "react";
import axios from "axios";

const GraphContext = React.createContext(undefined as any);

// eslint-disable-next-line react/prop-types
const GraphContextProvider: React.FC = ({ children }) => {
  const [graphUserId, setGraphUserId] = useState<string>();
  const [userStats, setUserStats] = useState<any>();

  //if (error) console.warn(error);

  const getGraphData = (user_id: String) => {
    console.log(user_id)
    return axios.get<any>(`/user/analytics/${user_id}`)
      .then(({data}) => {
        setUserStats(data);
      })
  }

  React.useEffect(() => {
    if (graphUserId) {
      getGraphData(graphUserId);
    }
  }, [graphUserId]);

  const graphProps = {
    userStats, 
    setUserStats,
    graphUserId, 
    setGraphUserId
  };

  return (
    <GraphContext.Provider value={graphProps}>{children}</GraphContext.Provider>
  );
};

export { GraphContext, GraphContextProvider };
