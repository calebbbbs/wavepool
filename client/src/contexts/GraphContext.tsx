import * as React from "react";
import { useState } from "react";

const GraphContext = React.createContext(undefined as any);

// eslint-disable-next-line react/prop-types
const GraphContextProvider: React.FC = ({ children }) => {
  const [userStats, setUserStats] = useState<any>();

  //if (error) console.warn(error);




  const graphProps = {
    userStats, 
    setUserStats
  };

  return (
    <GraphContext.Provider value={graphProps}>{children}</GraphContext.Provider>
  );
};

export { GraphContext, GraphContextProvider };
