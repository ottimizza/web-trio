class IllegalArgumentsException extends Error {

  public static UNSUPPORTED_TYPE = 'Please provide a "String", "Uint8Array" or "Array".';

  constructor(public message: string) {
    super(message);
    this.name = 'IllegalArgumentsException';
    this.stack = (new Error() as any).stack;
  }

}

export default IllegalArgumentsException;
