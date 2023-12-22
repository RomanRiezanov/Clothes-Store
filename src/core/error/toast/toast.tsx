import { t } from "@lingui/macro";
import React, { useContext, useEffect, useRef, useState } from "react";

// context
import { localesContext } from "../../locale/locale.provider";

// icons

// styles
import styles from "./toast.module.css";
import { CloseIcon } from "../../../app/assets/icons/close-icon/Close-Icon";

type Props = {
  remove: () => void;
  content: React.ReactNode;
  type: "error" | "warning" | "info" | "success";
};

function Toast({ remove, content, type }: Props) {
  const { i18n } = useContext(localesContext);
  const [isShown, setIsShown] = useState(true);
  const removeRef = useRef(remove);
  removeRef.current = remove;

  const showEmoji = () => {
    switch (type) {
      case "error":
        return <div className={styles.image}>🙅</div>;
      case "warning":
        return <div className={styles.image}>👆</div>;
      case "info":
        return <div className={styles.image}>💡</div>;
      case "success":
        return <div className={styles.image}>👍</div>;
      default:
        return "";
    }
  };

  const generateErrorTitle = () => {
    switch (type) {
      case "error":
        return t(i18n)`An error occured`;
      case "warning":
        return t(i18n)`Warning`;
      case "info":
        return t(i18n)`Information`;
      case "success":
        return t(i18n)`Success`;
      default:
        return "";
    }
  };

  useEffect(() => {
    const close = setTimeout(() => {
      if (isShown) {
        removeRef.current();
        setIsShown(false);
      }
    }, 10000);

    return () => clearTimeout(close);
  });

  return (
    <div
      className={isShown ? styles.toast : `${styles.toast} ${styles.toastHide}`}
    >
      {showEmoji()}
      <div className={styles.error}>
        <p className={styles.errorTitle}>{generateErrorTitle()}</p>
        <div className={styles.errorMessage}>{content}</div>
      </div>
      <button
        type="button"
        className={styles.buttonWrapper}
        onClick={() => {
          removeRef.current();
          setIsShown(false);
        }}
      >
        <CloseIcon width="20px" height="20px" />
      </button>
    </div>
  );
}

export default React.memo(Toast);
