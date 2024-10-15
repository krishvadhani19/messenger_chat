import Image from "next/image";
import React, { memo } from "react";
import "./Avatar.scss";

type AvatarPropsType = {
  imageUrl: string;
  imageName: string;
  size?: number;
  onClick?: () => void;
};

const Avatar = ({ imageUrl, imageName, size, onClick }: AvatarPropsType) => {
  return (
    <div
      className="avatar-container"
      onClick={onClick}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={imageUrl}
        alt={imageName || "image"}
        width={size || 40}
        height={size || 40}
      />
    </div>
  );
};

export default memo(Avatar);
