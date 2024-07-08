import { memo } from "react";
import "./ProgressBar.scss";

interface ProgressBarPropsType {
  progressPercentage: number;
  hideLabel?: boolean;
}

const ProgressBar = ({
  progressPercentage,
  hideLabel = false,
}: ProgressBarPropsType) => {
  return (
    <div className="progressbar-container">
      <div className="progressbar">
        <div
          className="progressbar-progress"
          style={{
            width: `${progressPercentage}%`,
            transform: `translateX(-${100 - (progressPercentage || 0)}%)`,
          }}
        />
      </div>

      {!hideLabel && (
        <div className="progressbar-label">{progressPercentage}%</div>
      )}
    </div>
  );
};

export default memo(ProgressBar);
