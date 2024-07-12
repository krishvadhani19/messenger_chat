"use client";

import { PlusIcon } from "@/components/ui/Icons";
import { memo, useCallback } from "react";
import "./AddServerButton.scss";
import Tooltip from "@/components/ui/Tooltip/Tooltip";

const AddServerButton = () => {
  const handleCreateNewServer = useCallback(() => {}, []);

  return (
    <Tooltip title="Add a server" placement="right">
      <div className="add-server-btn-container" onClick={handleCreateNewServer}>
        <PlusIcon size={20} />
      </div>
    </Tooltip>
  );
};

export default memo(AddServerButton);
