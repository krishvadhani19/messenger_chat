"use client";

import Button from "@/components/ui/Button/Button";
import { logout } from "@/server/actions/logout";
import React, { useCallback, useState } from "react";
import CreateServerModal from "../components/CreateServerModal";

const HomePage = () => {
  const [isServerModalOpen, setIsServerModalOpen] = useState<boolean>(false);

  const closeServerModal = useCallback(() => {
    setIsServerModalOpen(false);
  }, []);

  const handleCreateServer = useCallback(() => {
    setIsServerModalOpen(true);
  }, []);

  return (
    <div>
      <div className="" style={{ width: "100px" }}>
        <Button
          text="Logout"
          onClick={async () => {
            logout();
          }}
        />

        <Button text="Create Server" onClick={handleCreateServer} />
      </div>

      <CreateServerModal
        isServerModalOpen={isServerModalOpen}
        closeServerModal={closeServerModal}
      />
    </div>
  );
};

export default HomePage;
