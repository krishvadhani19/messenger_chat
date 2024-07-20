import { memo, useCallback, useState } from "react";
import "./ServerSearch.scss";
import Modal from "@/components/ui/Modal/Modal";
import { CommandIcon, SearchIcon } from "@/components/ui/Icons";
import InputField from "@/components/ui/Input/InputField";

type SearchServerPropsType = {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | undefined
      | {
          id: string;
          name: string;
          icon: JSX.Element;
        }[];
  }[];
};

const ServerSearch = ({ data }: SearchServerPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleModalVisibility = useCallback(
    () => setIsOpen((prev) => !prev),
    []
  );

  const handleSearchInputChange = useCallback((val: string) => {
    setSearchInput(val);
  }, []);

  return (
    <>
      <div className="server-search-container" onClick={handleModalVisibility}>
        <div className="server-search-title">
          <SearchIcon size={20} />
          Search
        </div>

        <div className="server-search-shortcut">
          <CommandIcon size={20} className="server-search-shortcut-item" />

          <span className="server-search-shortcut-item flex-center">K</span>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleModalVisibility} closeIcon={false}>
        <div className="search-server-modal-container">
          <InputField
            inputValue={searchInput}
            placeholder="Search all channels and members"
            type="text"
            autoComplete="text"
            onChange={handleSearchInputChange}
          />

          <div className="search-server-modal-results">
            {data.map((category, key) => {
              if (!category?.data?.length) {
                return null;
              }

              return (
                <div key={key} className="search-server-modal-results-category">
                  <div className="search-server-modal-results-category-title">
                    {category?.label}
                  </div>

                  <div className="search-server-modal-results-category-channels">
                    {category?.data?.map((dataItem, key) => (
                      <div
                        key={key}
                        className="search-server-modal-results-channel-item"
                      >
                        {dataItem?.icon}

                        <span>{dataItem?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(ServerSearch);
