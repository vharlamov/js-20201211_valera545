/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  
    const newStr = [];
    let count = 0;
    let prev;
    if( size === undefined ) return string; 
  
    for( let item of [...string] ) {
  
      if( item !== prev ) {
          count = 0;       
        } else  {
        count++;
          }
      if( count < size ) {
        newStr.push( item );
        }    
        prev = item;
    }
    return newStr.join('');
  } 