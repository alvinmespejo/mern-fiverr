export default function genericErrorException(
  statusCode,
  message,
  stack = null
) {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = message;
  err.stack = stack;

  return err;
}
