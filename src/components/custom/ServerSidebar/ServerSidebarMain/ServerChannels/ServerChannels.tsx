import React, { memo, useCallback } from "react";
import "./ServerChannels.scss";
import { PlusIcon } from "@/components/ui/Icons";
import Tooltip from "@/components/ui/Tooltip/Tooltip";

type ServerChannelPropsType = {
  data: {
    label: string;
    data: {
      id: string;
      name: string;
      icon: JSX.Element;
    }[];
  }[];
};

const ServerChannels = ({ data }: ServerChannelPropsType) => {
  const handleAddChanel = useCallback(() => {}, []);

  return (
    <div className="server-channels-container">
      {data.map((category, key) => {
        if (!category?.data.length) {
          return null;
        }

        return (
          <div className="server-channels-categoryItem" key={key}>
            <div className="server-channels-categoryItem-name">
              <span>{category?.label.toUpperCase()}</span>

              <Tooltip
                title={`Create a ${category?.label.slice(0, -1).toLowerCase()}`}
              >
                <PlusIcon
                  size={18}
                  onClick={handleAddChanel}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </div>

            <div className="server-channels-categoryItem-channels">
              {category?.data.map((channelItem, key) => (
                <div
                  key={key}
                  className="server-channels-categoryItem-channelItem"
                >
                  {channelItem?.icon}

                  <span>{channelItem?.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ServerChannels);
