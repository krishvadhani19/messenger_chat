import { memo, useCallback, useRef } from "react";
import Popover from "../Popover/Popover";
import "./Dropdown.scss";
import classNames from "classnames";
import { CaretSortIcon } from "../Icons";

export type dropdownItemType = {
  id: string;
  label: string;
};

type DropdownItemPropsType = {
  selectedItem: dropdownItemType;
  allItems: dropdownItemType[];
  handleItemClick: (item: any) => void;
};

const Dropdown = ({
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
            return (
              <div
                className={classNames("popover-item", {
                  isSelected: item?.id === selectedItem?.id,
                })}
                key={index}
                onClick={() => {
                  handleItemClick(item);
                  handleClose();
                }}
              >
                {item?.label}
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
        <div className="dropdown-container-selected-item">
          {selectedItem?.label}
        </div>

        <CaretSortIcon size={20} />
      </div>
      <Popover anchorRef={selectedItemRef}>{getDropdownContent}</Popover>
    </>
  );
};

export default memo(Dropdown);
