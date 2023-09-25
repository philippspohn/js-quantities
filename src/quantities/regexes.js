var SIGN = "[+-]";
var INTEGER = "\\d+";
var SIGNED_INTEGER = SIGN + "?" + INTEGER;
var FRACTION = "\\." + INTEGER;
var FLOAT = "(?:" + INTEGER + "(?:" + FRACTION + ")?" + ")" +
  "|" +
  "(?:" + FRACTION + ")";
var EXPONENT = "[Ee]" + SIGNED_INTEGER;
var SCI_NUMBER = "(?:" + FLOAT + ")(?:" + EXPONENT + ")?";
var SIGNED_NUMBER = SIGN + "?\\s*" + SCI_NUMBER;
var QTY_STRING = "(" + SIGNED_NUMBER + ")?" + "\\s*([^/]*)(?:\/(.+))?";
export var QTY_STRING_REGEX = new RegExp("^" + QTY_STRING + "$");

var POWER_OP = "\\^|\\*{2}";
// Allow unit powers representing scalar, length, area, volume; 4 is for some
// special case representations in SI base units.
var SAFE_POWER = "[01234]";
export var TOP_REGEX = new RegExp("([^ \\*\\d]+?)(?:" + POWER_OP + ")?(-?" + SAFE_POWER + "(?![a-zA-Z]))");
export var BOTTOM_REGEX = new RegExp("([^ \\*\\d]+?)(?:" + POWER_OP + ")?(" + SAFE_POWER + "(?![a-zA-Z]))");

var UNIT_TEST_REGEX;
var UNIT_MATCH_REGEX;

export function compileRegexes(PREFIX_MAP, UNIT_MAP) {
  var PREFIX_REGEX = Object.keys(PREFIX_MAP).sort(function(a, b) {
    return b.length - a.length;
  }).join("|");
  var UNIT_REGEX = Object.keys(UNIT_MAP).sort(function(a, b) {
    return b.length - a.length;
  }).join("|").replace("$", "\\$");

  /*
   * Minimal boundary regex to support units with Unicode characters
   * \b only works for ASCII
   */
  var BOUNDARY_REGEX = "\\b|$";
  var UNIT_MATCH = "(" + PREFIX_REGEX + ")??(" +
    UNIT_REGEX +
    ")(?:" + BOUNDARY_REGEX + ")";
  UNIT_TEST_REGEX = new RegExp("^\\s*(" + UNIT_MATCH + "[\\s\\*]*)+$");
  UNIT_MATCH_REGEX = new RegExp(UNIT_MATCH, "g"); // g flag for multiple occurences
}

export function getRegexes() {
  return {
    UNIT_TEST_REGEX,
    UNIT_MATCH_REGEX
  };
}
