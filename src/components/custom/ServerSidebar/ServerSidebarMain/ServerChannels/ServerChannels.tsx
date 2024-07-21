import React, { memo, useCallback, useState } from "react";
import "./ServerChannels.scss";
import {
  EditIcon,
  LockIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import CreateChanelModal from "../../ServerHeader/CreateChanelModal/CreateChanelModal";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalVisibility = useCallback(
    () => setIsOpen((prev) => !prev),
    []
  );

  return (
    <>
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
                  title={`Create a ${category?.label
                    .slice(0, -1)
                    .toLowerCase()}`}
                >
                  <PlusIcon
                    size={18}
                    onClick={handleModalVisibility}
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
                    <div className="server-channels-categoryItem-channelItem-name">
                      {channelItem?.icon}
                      <span>{channelItem?.name}</span>
                    </div>

                    <div className="server-channels-categoryItem-channelItem-invisible-container">
                      <EditIcon size={16} />
                      <TrashIcon size={16} />
                    </div>

                    <div className="server-channels-categoryItem-channelItem-visible-container">
                      <LockIcon size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <CreateChanelModal isOpen={isOpen} onClose={handleModalVisibility} />
    </>
  );
};

export default memo(ServerChannels);
