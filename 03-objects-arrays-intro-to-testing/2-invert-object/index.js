/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    const invObj = {};
    if( !obj ) return;
    for( let [key, value] of Object.entries(obj)) {
      invObj[value] = key.toString();
    }
    return invObj;
  }