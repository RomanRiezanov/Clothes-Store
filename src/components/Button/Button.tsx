import React from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  title: string;
  active: boolean;
  buttonType: string;

}

const Button = ({ title, active, buttonType }: ButtonProps) => {
  return (
    <div>
      <button className={active ? `${classes[buttonType]} ${classes.active}` : `${classes[buttonType]} `}>
        <span> {title} </span>
      </button>
    </div>
  );
};

export default Button;
