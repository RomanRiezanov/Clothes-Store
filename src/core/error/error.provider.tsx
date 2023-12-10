import React from "react";

// import ErrorPageScreen from "../../web/src/screens/errorPage/errorPage.screen";

import {
  ApiError,
  FatalError,
  PermissionError,
  ValidationError,
  unknownToError,
} from "./error";
import Toast from "./toast/toast";

import type { ErrorTransfer } from "./error.types";

// styles
import styles from "./toast/toast.module.css";

type ErrorContext = {
  bug: InstanceType<typeof ErrorProvider>["bug"];
  info: InstanceType<typeof ErrorProvider>["info"];
  fatal: InstanceType<typeof ErrorProvider>["fatal"];
  success: InstanceType<typeof ErrorProvider>["success"];
  error?: ErrorTransfer | null;
  setError: InstanceType<typeof ErrorProvider>["setError"];
};

export const errorContext = React.createContext<ErrorContext>(undefined!);

type Props = {
  children: React.ReactNode;
};

type State = {
  context: ErrorContext;
  toasts: {
    id: number;
    content: React.ReactNode;
    type: "error" | "warning" | "info" | "success";
  }[];
};

export class ErrorProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      context: {
        bug: this.bug,
        info: this.info,
        success: this.success,
        fatal: this.fatal,
        error: null,
        setError: this.setError,
      },
      toasts: [],
    };
  }

  addToast = (
    content: React.ReactNode,
    toastType: "error" | "warning" | "info" | "success"
  ) => {
    const { toasts } = this.state;
    const id = toasts.length > 0 ? toasts[toasts.length - 1].id + 1 : 1;

    this.setState({
      ...this.state,
      toasts: [...this.state.toasts, { id, content, type: toastType }],
    });
  };

  remove = (id: number) => {
    this.setState({
      ...this.state,
      toasts: this.state.toasts.filter((toast) => toast.id !== id),
    });
  };

  bug = (rawError: unknown): void => {
    const error = unknownToError(rawError);
    console.error(error);
    if (error instanceof PermissionError) {
      return this.setError(error);
    }
    this.addToast(error.message, "error");
  };

  info = (message: unknown): void => {
    this.addToast(<>{message}</>, "info");
  };

  success = (message: unknown): void => {
    this.addToast(<>{message}</>, "success");
  };

  fatal = (rawError: unknown): void => {
    const error = unknownToError(rawError);
    console.error("Fatal", error);
    this.setError(error);
  };

  setError = (
    error:
      | Error
      | PermissionError
      | ApiError
      | ValidationError
      | FatalError
      | null
  ): void => {
    this.setState({
      context: {
        ...this.state.context,
        error,
      },
    });
  };

  removeToast = (toastId: number) => {
    return () => this.remove(toastId);
  };

  static getDerivedStateFromError(error: Error, prevState: State): State {
    return {
      ...prevState,
      context: {
        ...prevState.context,
        error,
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    this.fatal(error);
  }

  render(): JSX.Element {
    const isCriticalError =
      this.state.context.error &&
      !(
        this.state.context.error instanceof PermissionError &&
        this.state.context.error.payload.code === 401
      );

    return (
      <errorContext.Provider value={this.state.context}>
        {isCriticalError ? <div>Error Page</div> : this.props.children}
        <div className={styles.toastsWrapper}>
          {this.state.toasts.map((toast) => (
            <Toast
              key={toast.id}
              remove={this.removeToast(toast.id)}
              content={toast.content}
              type={toast.type}
            />
          ))}
        </div>
      </errorContext.Provider>
    );
  }
}
