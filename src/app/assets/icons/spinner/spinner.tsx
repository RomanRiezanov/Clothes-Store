import classnames from "classnames";
import React, { memo } from "react";

// styles
import styles from "./spinner.module.css";

type SpinnerProps = {
  size?: "tiny" | "small" | "medium" | "large";
  className?: string;
  color?: "blue" | "white" | "dark" | "grey" | "red";
};

const Spinner: React.FC<SpinnerProps> = memo(
  ({ size = "small", className, color = "dark" }) => (
    <div
      className={classnames(
        styles.wrapper,
        className,
        styles[color],
        styles[size]
      )}
    >
      <div className={styles.spinner} />
    </div>
  )
);

export default Spinner;
