import MUITooltip from "@mui/material/Tooltip";

type TooltipPropsType = {
  children: React.ReactElement;
  title: string;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  enterDelay?: number;
};

const Tooltip = ({
  children,
  title,
  placement = "right",
  enterDelay = 0,
}: TooltipPropsType) => {
  return (
    <MUITooltip
      title={title}
      placement={placement}
      enterDelay={enterDelay}
      arrow
    >
      <span>{children}</span>
    </MUITooltip>
  );
};

export default Tooltip;
