import React, { memo, useCallback, useContext, useState } from "react";
import "./ServerChannels.scss";
import {
  EditIcon,
  LockIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import CreateChanelModal from "../../ServerHeader/CreateChanelModal/CreateChanelModal";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";
import { ChanelType, MemberRole } from "@prisma/client";
import ManageMembersModal from "../../ServerHeader/ManageMembersModal/ManageMembersModal";

type ServerChannelPropsType = {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      id: string;
      name: string;
      icon: JSX.Element;
    }[];
  }[];
};

const CURRENT_MODAL_CATEGORIES = {
  CREATE_CHANNEL: "CREATE_CHANNEL",
  MANAGE_MEMBER: "MANAGE_MEMBER",
} as const;

type CURRENT_MODAL_CATEGORIES_TYPE =
  (typeof CURRENT_MODAL_CATEGORIES)[keyof typeof CURRENT_MODAL_CATEGORIES];

const ServerChannels = ({ data }: ServerChannelPropsType) => {
  const [currentModal, setCurrentModal] =
    useState<CURRENT_MODAL_CATEGORIES_TYPE | null>(null);
  const [currentChannel, setCurrentChannel] = useState<ChanelType>(
    ChanelType.TEXT
  );

  const handleModalChange = useCallback(
    (category: CURRENT_MODAL_CATEGORIES_TYPE | null) => {
      setCurrentModal(category);
    },
    []
  );

  const { currentUserMember } = useContext(ServerSidebarContext);

  console.log({ currentChannel });

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

                {currentUserMember?.role !== MemberRole.GUEST &&
                  category?.type === "channel" && (
                    <Tooltip
                      title={`Create a ${category?.label
                        .slice(0, -1)
                        .toLowerCase()}`}
                    >
                      <PlusIcon
                        size={16}
                        onClick={() => {
                          handleModalChange(
                            CURRENT_MODAL_CATEGORIES.CREATE_CHANNEL
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  )}

                {currentUserMember?.role === MemberRole.ADMIN &&
                  category?.type === "member" && (
                    <Tooltip
                      title={`Create a ${category?.label
                        .slice(0, -1)
                        .toLowerCase()}`}
                    >
                      <SettingsIcon
                        size={16}
                        onClick={() =>
                          handleModalChange(
                            CURRENT_MODAL_CATEGORIES.MANAGE_MEMBER
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  )}
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

                    {channelItem?.name === "general" && (
                      <div className="server-channels-categoryItem-channelItem-visible-container">
                        <LockIcon size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <CreateChanelModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.CREATE_CHANNEL}
        onClose={handleModalChange}
        defaultSelection={currentChannel}
      />

      <ManageMembersModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.MANAGE_MEMBER}
        onClose={handleModalChange}
      />
    </>
  );
};

export default memo(ServerChannels);
