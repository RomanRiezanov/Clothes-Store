import React, { MouseEvent, memo, useState } from "react";
import classnames from "classnames";

// icons
import Spinner from "../../app/assets/icons/spinner/spinner";

// consts
import { SIZES } from "./button.consts";

// styles
import styles from "./button.module.css";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
  fontSize?: keyof typeof SIZES;
  size?: "small" | "medium";
  width?: "full" | "auto";
  variant?: "default" | "outline";
  color?: "dark" | "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  iconOrientation?: "start" | "end";
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = memo(
  ({
    children,
    fontSize = "large",
    size = "medium",
    width = "full",
    variant = "default",
    color = "dark",
    iconOrientation = "end",
    icon,
    disabled,
    loading = false,
    className,
    onClick,
    type,
    ...props
  }) => {
    const [isPromiseLoading, setIsLoading] = useState(false);

    const buttonHandler = async (e: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        const handlerValue: unknown = onClick(e);
        if (handlerValue instanceof Promise) {
          setIsLoading(true);
          await handlerValue;
          setIsLoading(false);
        }
      }
    };

    const isLoading = isPromiseLoading || loading;
    return (
      <button
        {...props}
        className={classnames(
          styles.button,
          styles[variant],
          styles[size],
          styles[width],
          styles[color],
          className
        )}
        disabled={disabled || isLoading}
        type={type}
        onClick={buttonHandler}
      >
        <>
          {iconOrientation === "start" && icon}
          <span color={"white"}>{children}</span>
          {iconOrientation === "end" && icon}
          {isLoading && (
            <Spinner color={"white"} size="tiny" className={styles.spinner} />
          )}
        </>
      </button>
    );
  }
);

export default Button;
