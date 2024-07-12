import React, { memo } from "react";
import "./ServerContainer.scss";
import { Server } from "@prisma/client";
import ServerItem from "../ServerItem/ServerItem";

type ServerContainerPropsType = {
  servers: Server[] | null;
};

const ServerContainer = ({ servers }: ServerContainerPropsType) => {
  if (!servers) {
    return <div>No servers</div>;
  }

  return (
    <div className="server-container">
      {servers.map((serverItem, key) => {
        return <ServerItem key={key} serverItem={serverItem} />;
      })}
    </div>
  );
};

export default memo(ServerContainer);
