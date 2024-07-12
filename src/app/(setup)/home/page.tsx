"use client";

import Button from "@/components/ui/Button/Button";
import { logout } from "@/server/actions/logout";
import React, { useCallback, useState } from "react";
import CreateServerModal from "@/components/custom/CreateServerModal/CreateServerModal";

const HomePage = () => {
  const [isServerModalOpen, setIsServerModalOpen] = useState<boolean>(false);

  const handleServerModalChange = useCallback(() => {
    setIsServerModalOpen((prev) => !prev);
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

        <Button text="Create Server" onClick={handleServerModalChange} />
      </div>

      <CreateServerModal
        isServerModalOpen={isServerModalOpen}
        closeServerModal={handleServerModalChange}
      />
    </div>
  );
};

export default HomePage;
