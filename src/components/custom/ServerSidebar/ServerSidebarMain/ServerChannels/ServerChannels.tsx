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
import { MemberRole } from "@prisma/client";
import ManageMembersModal from "../../ServerHeader/ManageMembersModal/ManageMembersModal";
import DeleteModal from "@/components/generic/DeleteModal/DeleteModal";
import { APIRequest } from "@/utils/auth-util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
  DELETE_CHANNEL: "DELETE_CHANNEL",
} as const;

type CURRENT_MODAL_CATEGORIES_TYPE =
  (typeof CURRENT_MODAL_CATEGORIES)[keyof typeof CURRENT_MODAL_CATEGORIES];

const ServerChannels = ({ data }: ServerChannelPropsType) => {
  const [currentModal, setCurrentModal] =
    useState<CURRENT_MODAL_CATEGORIES_TYPE | null>(null);

  const [currentItem, setCurrentItem] = useState<{
    id: string;
    name: string;
    icon: JSX.Element;
  }>();

  const handleModalChange = useCallback(
    (
      category: CURRENT_MODAL_CATEGORIES_TYPE | null,
      channelItem?: {
        id: string;
        name: string;
        icon: JSX.Element;
      }
    ) => {
      setCurrentModal(category);

      setCurrentItem(channelItem);
    },
    []
  );

  const { currentUserMember, deleteChannelFromServer } =
    useContext(ServerSidebarContext);

  const handleDeleteChannel = useCallback(async () => {
    deleteChannelFromServer(currentItem?.id!);
  }, [currentItem, deleteChannelFromServer]);

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
                        onClick={() => {
                          handleModalChange(
                            CURRENT_MODAL_CATEGORIES.MANAGE_MEMBER
                          );
                        }}
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

                    {category?.type === "channel" && (
                      <div className="server-channels-categoryItem-channelItem-invisible-container">
                        <Tooltip title="Edit" placement="top">
                          <EditIcon size={16} />
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <TrashIcon
                            size={16}
                            onClick={() => {
                              handleModalChange(
                                CURRENT_MODAL_CATEGORIES.DELETE_CHANNEL,
                                channelItem
                              );
                            }}
                          />
                        </Tooltip>
                      </div>
                    )}

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
      />

      <ManageMembersModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.MANAGE_MEMBER}
        onClose={handleModalChange}
      />

      <DeleteModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.DELETE_CHANNEL}
        onClose={handleModalChange}
        deleteItemHeader="Delete channel"
        deleteItemName={currentItem?.name!}
        confirmButtonText="Confirm"
        confirmChanges={handleDeleteChannel}
      />
    </>
  );
};

export default memo(ServerChannels);
