"use client";

import React, { memo, useCallback } from "react";
import "./ServerItem.scss";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import { Server } from "@prisma/client";

type ServerItemPropsType = {
  serverItem: Server;
};

const ServerItem = ({ serverItem }: ServerItemPropsType) => {
  const handelServerItemClick = useCallback(() => {
    console.log("click");
  }, []);

  return (
    <Tooltip title={serverItem.name}>
      <div className="server-item-container" onClick={handelServerItemClick}>
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={serverItem?.imageUrl}
            alt={serverItem?.name || "serverName"}
            width={44}
            height={44}
          />
        }

        <div className="server-item-container-border"></div>
      </div>
    </Tooltip>
  );
};

export default memo(ServerItem);
