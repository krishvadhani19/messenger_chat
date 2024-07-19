import { memo, useCallback, useRef } from "react";
import Popover from "../Popover/Popover";
import "./Dropdown.scss";
import classNames from "classnames";
import { CaretSortIcon, TickIcon } from "../Icons";

export type dropdownItemType = {
  id: string;
  label: string;
};

type DropdownItemPropsType = {
  label?: string;
  selectedItem: dropdownItemType;
  allItems: dropdownItemType[];
  handleItemClick: (item: any) => void;
};

const Dropdown = ({
  label = "",
  selectedItem,
  allItems,
  handleItemClick,
}: DropdownItemPropsType) => {
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const getDropdownContent = useCallback(
    (handleClose: () => void) => {
      return (
        <div className="popover-container">
          {allItems.map((item, index) => {
            const isSelected = item?.id === selectedItem?.id;
            return (
              <div
                className={classNames("popover-item", {
                  isSelected,
                })}
                key={index}
                onClick={() => {
                  handleItemClick(item);
                  handleClose();
                }}
              >
                {item?.label}

                {isSelected && <TickIcon size={18} color="#22c55e" />}
              </div>
            );
          })}
        </div>
      );
    },
    [allItems, handleItemClick, selectedItem?.id]
  );

  return (
    <>
      <div className="dropdown-container" ref={selectedItemRef}>
        {label && (
          <div className="dropdown-container-label">
            {label}
            <sup style={{ color: "#f43f5e" }}>*</sup>
          </div>
        )}

        <div className="dropdown-container-selected-item">
          <div className="">{selectedItem?.label}</div>

          <CaretSortIcon size={20} />
        </div>
      </div>

      <Popover
        anchorRef={selectedItemRef}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {getDropdownContent}
      </Popover>
    </>
  );
};

export default memo(Dropdown);
