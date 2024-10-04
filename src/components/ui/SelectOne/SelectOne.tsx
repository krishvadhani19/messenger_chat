import { memo } from "react";
import "./SelectOne.scss";
import classNames from "classnames";

type SelectOneItemType = {
  id: string;
  label: string;
  description: string | undefined;
  price: number;
};

interface SelectOnePropsType {
  selectedItem: SelectOneItemType;
  selectOneAllOptions: SelectOneItemType[];
  handleItemClick: (item: any) => void;
}

const SelectOne = ({
  selectedItem,
  selectOneAllOptions,
  handleItemClick,
}: SelectOnePropsType) => {
  return (
    <div className="select-one-container">
      {selectOneAllOptions.map((item, index) => {
        return (
          <div
            className={classNames("select-one-item", {
              isSelected: selectedItem?.id === item?.id,
            })}
            key={index}
            onClick={() => handleItemClick(item)}
          >
            <div className="select-one-item-details">
              <div className="select-one-item-label">{item?.label}</div>
              <div className="select-one-item-description">
                {item?.description}
              </div>
            </div>

            <div className="select-one-item-price"></div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(SelectOne);
