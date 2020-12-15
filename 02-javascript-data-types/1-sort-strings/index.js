/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let tmpArr = arr.slice();
    if( param == 'asc' ) {
        return tmpArr.sort( (a, b) => a.localeCompare( b, 'ru-en', { caseFirst:'upper', sensitivity:'case', usage:'sort' } ) );
    } else  {
        return tmpArr.sort( (a, b) => a.localeCompare( b, 'ru-en', { caseFirst:'lower', sensitivity:'case', usage:'sort' } ) ).reverse();
    };
}
//console.log(sortStrings(['Абрикос', 'абрикос', 'Ёжик', 'ёжик', 'Яблоко', 'яблоко', 'apple', 'Apple', 'banana', 'Banana', 'orange', 'Orange'], 'desc'))