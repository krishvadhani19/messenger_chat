import React from "react";
import "./CustomImage.scss";

type ImagePropsType = {
  url: string;
  alt: string;
  width: number;
  height: number;
  classes?: string;
  onClick?: () => void;
};

const CustomImage = ({
  url,
  alt,
  width,
  height,
  classes,
  onClick,
}: ImagePropsType) => {
  return (
    <div
      className={`image-container ${classes}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} width={width} height={height} />
      }
    </div>
  );
};

export default CustomImage;
