/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const tmpArr = arr.slice();

    function f( a, b ) {
        let first, second, caseVal;
        if( param == 'asc' ) {
            first = a, second = b;
            caseVal = 'upper';
        } else if( param == 'desc' ) {
            first = b, second = a;
            caseVal = 'lower';
        }
      return first.localeCompare( second, ['ru','en'], { caseFirst: caseVal, sensitivity:'case', usage:'sort' } );
    }
   
        return tmpArr.sort( f );
}
