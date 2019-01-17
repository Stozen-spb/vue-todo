

function getIndex(n){

  var d=((n|=0)+9)%10|0;

  return n/10%10^1&&d<4?+!d:2;

}

// пример использования:

// alert( ['дня', 'день', 'дней'][getIndex(12)] );

function findIndex(arr, id) {
	let i;

	for ( i = 0; i < arr.length; i++) {
		if (arr[i].id == id) {
			return i;
		}
	}

	return undefined;
}
/**
 * фильтрация
 * @param {string} filter значение фильтра
 * @param {array} массив для фильтрации
 * @param {string} поле по которому идет фильтрация
 */
function chainFilters(filter,array, property) {
	if (filter != 'all'){
		array = array.filter((item) => {
		return (item[property] == filter );
		})
		return array;
	} else return array;
}
/**
 * сортировка 
 * @param {string} filter значение фильтра
 * @param {array} массив для сортировки
 * @param {string} поле по которому идет сортировка
 */
function dateFilter(filter,array, property) {
	if (filter != 'all'){

		if (filter == 'low') {
			array.sort((a,b) => {
			return ( Date.parse( a[property] ) > Date.parse( b[property] )) ? 1 : -1 ;
			})
		}

		if (filter == 'high') {
			array.sort((a,b) => {
			return ( Date.parse( a[property] ) < Date.parse( b[property] )) ? 1 : -1 ;
			})
		}
		return array;
	} else return array;
}


export { getIndex, findIndex, chainFilters, dateFilter};