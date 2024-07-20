import { memo, useCallback, useState } from "react";
import "./ServerSearch.scss";
import Modal from "@/components/ui/Modal/Modal";
import { CommandIcon } from "@/components/ui/Icons";

const ServerSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalVisibility = useCallback(
    () => setIsOpen((prev) => !prev),
    []
  );

  return (
    <>
      <div className="server-search-container" onClick={handleModalVisibility}>
        <div className="server-search-title">Search Server</div>

        <div className="server-search-shortcut">
          <CommandIcon size={20} className="server-search-shortcut-item" />

          <span className="server-search-shortcut-item flex-center">K</span>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleModalVisibility}>
        <div></div>
      </Modal>
    </>
  );
};

export default memo(ServerSearch);
