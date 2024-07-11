import React from "react";
import "./CustomImage.scss";

type ImagePropsType = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

const CustomImage = ({ url, alt, width, height }: ImagePropsType) => {
  return (
    <div className="image-container" style={{ width, height }}>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} width={width} height={height} />
      }
    </div>
  );
};

export default CustomImage;
