import React, { useContext } from "react";
import LoginButton from "./LoginButton";
import { UserContext } from "../../contexts/UserContext";

import Search from "../Search/Search";

function Main(props: any) {
  const { isLoggedIn }: any = useContext(UserContext);
  return (
    <div>
      {!isLoggedIn ? (
        <div>
          {" "}
          <LoginButton />
        </div>
      ) : (
        <div>
          <Search />
          {JSON.stringify(props.user)}
        </div>
      )}
    </div>
  );
}

export default Main;
