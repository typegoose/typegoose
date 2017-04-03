export class InvalidPropError extends Error {
  constructor(typeName, key: string) {
    super(`In property ${key}: ${typeName} is not a primitive type nor a Typegoose schema (Not extending it).`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(key) {
    super(`Type of ${key} property is not a number.`);
  }
}
