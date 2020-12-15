/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    let newList = {};
  
    for( let [key, value] of Object.entries( obj ) ) {
      if( fields.includes( key ) ) {
        newList[ key ] = value;
      }
    }
    // for( let field of fields ) {
    //   if( !obj[ field ] ) {
    //     newList[ field ] = null;
    //     }
    // }
  
    return newList;
}
