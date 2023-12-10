type Payload = {
  code?: number;
  data?: unknown;
  stack?: string;
};

type InputPayload = {
  field?: string;
};

export class ValidationError extends Error {
  payload: Payload;
  constructor(message: string, payload: Payload = {}) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

export class PermissionError extends Error {
  payload: Payload;
  constructor(message: string, payload: Payload = {}) {
    super(message);
    this.name = 'PermissionError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

export class ApiError extends Error {
  payload: Payload;
  constructor(message: string, payload: Payload = {}) {
    super(message);
    this.name = 'ApiError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

export class PropertyError extends Error {
  payload: InputPayload;
  constructor(message: string, payload: InputPayload = {}) {
    super(message);
    this.name = 'PropertyError';
    this.message = message;
    this.payload = payload;
  }
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

export class FatalError extends Error {
  payload: Payload;
  constructor(message: string, payload: Payload = {}) {
    super(`Fatal error: ${message}`);
    this.name = 'FatalError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

export class DefaultError extends Error {
  payload: Payload;
  constructor(error: Error) {
    super(`Default error: ${error.message}`);
    this.name = 'DefaultError';
    this.message = error.message;
    this.payload = {};
    if (error.stack) {
      this.stack = error.stack;
    }
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

type RedirectErrorPayload = {
  code: number;
  data: {
    url: string;
  };
  stack: string;
};

export class RedirectError extends Error {
  payload: RedirectErrorPayload;
  constructor(message: string, payload: RedirectErrorPayload) {
    super(`Fatal error: ${message}`);
    this.name = 'RedirectError';
    this.message = message;
    this.payload = payload;
    this.stack = payload.stack;
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      payload: this.payload,
    };
  }
}

export type ExtendedError =
  | FatalError
  | ApiError
  | PermissionError
  | ValidationError
  | DefaultError;

/**
 * Function checks the error type based on payload similarity
 * PropertyError doesn't included intentionally
 * @param e any error type
 * @returns true if this is extendedError
 */
export function isExtendedError(e: unknown): e is ExtendedError {
  return (
    e instanceof FatalError ||
    e instanceof ApiError ||
    e instanceof PermissionError ||
    e instanceof ValidationError ||
    e instanceof DefaultError
  );
}

/**
 * Convert unknown to Error object or keep if it was error
 * @param rawError unknown
 * @returns Error or Extended Error class
 */
export function unknownToError(rawError: unknown): Error | ExtendedError {
  if (isExtendedError(rawError)) return rawError;
  if (rawError instanceof Error) return new DefaultError(rawError);
  if (typeof rawError === 'string') return new Error(rawError);

  return new Error('unknown Error with no message, stack and payload');
}
