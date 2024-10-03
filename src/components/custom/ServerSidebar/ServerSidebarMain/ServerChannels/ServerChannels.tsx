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
import CreateChannelModal from "../../ServerHeader/CreateChannelModal/CreateChannelModal";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";
import { ChannelType, MemberRole } from "@prisma/client";
import ManageMembersModal from "../../ServerHeader/ManageMembersModal/ManageMembersModal";
import DeleteModal from "@/components/generic/DeleteModal/DeleteModal";
import EditModal from "@/components/generic/EditModal/EditModal";
import { useParams, useRouter } from "next/navigation";
import classNames from "classnames";
import { CurrentUserStore } from "@/stores/useCurrentUser";

type ServerChannelPropsType = {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      id: string;
      name: string;
      icon: JSX.Element;
      type: ChannelType | null;
    }[];
  }[];
};

const CURRENT_MODAL_CATEGORIES = {
  CREATE_CHANNEL: "CREATE_CHANNEL",
  MANAGE_MEMBER: "MANAGE_MEMBER",
  DELETE_CHANNEL: "DELETE_CHANNEL",
  EDIT_CHANNEL: "EDIT_CHANNEL",
} as const;

type CURRENT_MODAL_CATEGORIES_TYPE =
  (typeof CURRENT_MODAL_CATEGORIES)[keyof typeof CURRENT_MODAL_CATEGORIES];

const ServerChannels = ({ data }: ServerChannelPropsType) => {
  const [currentModal, setCurrentModal] =
    useState<CURRENT_MODAL_CATEGORIES_TYPE | null>(null);
  const router = useRouter();
  const { serverId, memberId, channelId } = useParams();

  const [currentItem, setCurrentItem] = useState<{
    id: string;
    name: string;
    icon: JSX.Element;
    type: ChannelType | null;
  }>();

  const handleModalChange = useCallback(
    (
      category: CURRENT_MODAL_CATEGORIES_TYPE | null,
      channelItem?: {
        id: string;
        name: string;
        icon: JSX.Element;
        type: ChannelType | null;
      }
    ) => {
      if (channelItem) {
        setCurrentItem({ ...channelItem });
      }
      setCurrentModal(category);
    },
    []
  );

  const { deleteChannelFromServer, editChannelFromServer } =
    useContext(ServerSidebarContext);
  const currentUserMember = CurrentUserStore().currentUserMember;

  const handleDeleteChannel = useCallback(async () => {
    await deleteChannelFromServer(currentItem?.id!);
  }, [currentItem, deleteChannelFromServer]);

  const handleEditChannel = useCallback(
    async (channelName: string, channelType: ChannelType) => {
      await editChannelFromServer(currentItem?.id!, channelName, channelType);
    },
    [currentItem?.id, editChannelFromServer]
  );

  const handleChannelItemClick = useCallback(
    (channelId: string, channelType: "member" | "channel") => {
      if (channelType === "channel") {
        router.push(`/servers/${serverId}/channels/${channelId}`);
      } else if (channelType === "member") {
        router.push(`/servers/${serverId}/conversations/${channelId}`);
      }
    },
    [router, serverId]
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
                    className={classNames(
                      "server-channels-categoryItem-channelItem",
                      {
                        isSelected:
                          channelId === channelItem?.id ||
                          memberId === channelItem?.id,
                      }
                    )}
                    onClick={() =>
                      handleChannelItemClick(channelItem?.id, category?.type)
                    }
                  >
                    <div className="server-channels-categoryItem-channelItem-name">
                      {channelItem?.icon}
                      <span>{channelItem?.name}</span>
                    </div>

                    {category?.type === "channel" && (
                      <div className="server-channels-categoryItem-channelItem-invisible-container">
                        <Tooltip title="Edit" placement="top">
                          <EditIcon
                            size={16}
                            onClick={() => {
                              handleModalChange(
                                CURRENT_MODAL_CATEGORIES.EDIT_CHANNEL,
                                channelItem
                              );
                            }}
                          />
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

      {currentModal === CURRENT_MODAL_CATEGORIES.CREATE_CHANNEL && (
        <CreateChannelModal isOpen onClose={handleModalChange} />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.MANAGE_MEMBER && (
        <ManageMembersModal isOpen onClose={handleModalChange} />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.DELETE_CHANNEL && (
        <DeleteModal
          isOpen
          onClose={handleModalChange}
          deleteItemHeader="Delete channel"
          deleteItemName={currentItem?.name!}
          confirmButtonText="Confirm"
          confirmChanges={handleDeleteChannel}
        />
      )}

      {/* Doing this modal does not render in the DOM on initial render of this component */}
      {currentModal === CURRENT_MODAL_CATEGORIES.EDIT_CHANNEL && (
        <EditModal
          isOpen
          onClose={handleModalChange}
          modalHeading="Edit channel"
          channelName={currentItem?.name!}
          confirmButtonText="Confirm"
          defaultChannelTypeSelection={currentItem?.type!}
          confirmChanges={handleEditChannel}
        />
      )}
    </>
  );
};

export default memo(ServerChannels);
