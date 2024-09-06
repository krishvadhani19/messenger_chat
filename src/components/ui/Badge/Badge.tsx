import classNames from "classnames";
import "./Badge.scss";

type BadgePropsType = {
  children: React.ReactNode;
  isConnected: boolean;
};

const Badge = ({ children, isConnected }: BadgePropsType) => {
  console.log({ isConnected });

  return (
    <div className={classNames("badge-container", { isConnected })}>
      {children}
    </div>
  );
};

export default Badge;
