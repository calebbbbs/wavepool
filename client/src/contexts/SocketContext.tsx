import React from 'react'

interface SocketContextInterface {
    socket: any;
  }

  const SocketContext = React.createContext<SocketContextInterface>({
    socket: null,
  });

export default SocketContext
