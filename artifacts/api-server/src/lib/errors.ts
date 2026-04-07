export interface ApiError {
  error: string;
  code: string;
  status: number;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
  }
}

export const Errors = {
  notFound: (resource: string) =>
    new AppError(`${resource} not found`, "NOT_FOUND", 404),
  badRequest: (message: string) =>
    new AppError(message, "BAD_REQUEST", 400),
  conflict: (message: string) =>
    new AppError(message, "CONFLICT", 409),
  internal: () =>
    new AppError("Internal server error", "INTERNAL_ERROR", 500),
};

export function toErrorResponse(err: unknown): ApiError & { status: number } {
  if (err instanceof AppError) {
    return { error: err.message, code: err.code, status: err.status };
  }
  return { error: "Internal server error", code: "INTERNAL_ERROR", status: 500 };
}
