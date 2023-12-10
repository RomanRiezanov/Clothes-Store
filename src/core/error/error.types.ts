export interface ErrorTransfer {
  name: string;
  message: string;
  stack?: string;
  payload?: {
    code?: number;
    data?: unknown;
  };
}
