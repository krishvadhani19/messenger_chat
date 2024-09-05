import "./Badge.scss";

type BadgePropsType = {
  title: string;
};

const Badge = ({ title }: BadgePropsType) => {
  return <div className="badge-container">{title}</div>;
};

export default Badge;
