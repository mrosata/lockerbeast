/**
 * Utilities for testing values for type
 * ```
 *    if ( is.none(val) )      { "Value is null"          }
 *    if ( is.object(val) )    { "Value is a real object" }
 *    if ( is.array(val) )     { "Value is an Array"      }
 *    if ( is.callable(val) )  { "Value is a Function"    }
 *    if ( is.defined(val) )   { "Value is not undefined" }
 *    if ( is.string(val) )    { "Value is a String"      }
 *    if ( is.number(val) )    { "Value is a number"      }
 *    if ( is.a(val, B) )      { "Value is of type B"     }
 *    if ( is.thenable(val) )  { "Value is has then function" }
 * ```
 */
export default class is {
  static none(testValue) {
    return !testValue && typeof testValue === "object";
  }
  static objectType(testValue) {
    return !!testValue && typeof testValue === "object";
  }
  static object(testValue) {
    return is.objectType(testValue) && testValue.constructor !== Array;
  }
  static array(testValue) {
    return is.objectType(testValue) && testValue.constructor === Array;
  }
  static callable(testValue) {
    return typeof testValue === "function";
  }
  static defined(testValue) {
    return typeof testValue !== "undefined";
  }
  static notDefined(testValue) {
    return typeof testValue === "undefined";
  }
  static string(testValue) {
    return typeof testValue === "string";
  }
  static number(testValue) {
    return typeof testValue === "number" && !Number.isNaN(testValue);
  }
  // Class
  static a(testValue, typeConstructor) {
    return (is.objectType(testValue) || is.callable(testValue)) && testValue.constructor === typeConstructor;
  }
  // Promise
  static thenable(testValue) {
    return is.objectType(testValue) && is.callable(testValue.then);
  }
}
