"use client";

import { PlusIcon } from "@/components/ui/Icons";
import { memo, useCallback, useState } from "react";
import "./AddServerButton.scss";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import CreateServerModal from "./CreateServerModal/CreateServerModal";

const AddServerButton = () => {
  const [isServerModalOpen, setIsServerModalOpen] = useState<boolean>(false);

  const handleServerModalChange = useCallback(() => {
    setIsServerModalOpen((prev) => !prev);
  }, []);

  return (
    <Tooltip title="Add a server" placement="right">
      <>
        <div
          className="add-server-btn-container"
          onClick={handleServerModalChange}
        >
          <PlusIcon size={20} />
        </div>

        {isServerModalOpen && (
          <CreateServerModal
            isServerModalOpen
            closeServerModal={handleServerModalChange}
          />
        )}
      </>
    </Tooltip>
  );
};

export default memo(AddServerButton);
