class InternalError extends Error {
  readonly status = 500;
}

export default InternalError;
