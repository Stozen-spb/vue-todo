

function getIndex(n){

  var d=((n|=0)+9)%10|0;

  return n/10%10^1&&d<4?+!d:2;

}

// пример использования:

// alert( ['дня', 'день', 'дней'][getIndex(12)] );

function findIndex(arr, id) {
	let result = -1;
	// находим порядковый номер элемента с id 
	arr.forEach( (item,index)=> {
		if (item.id == id) {
			result = index;
		}
	})
	return result;
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
			array = array.sort((a,b) => {
			return Date.parse( a[property] ) > Date.parse( b[property] ) ? 1 : 0 ;
			})
		}

		if (filter == 'high') {
			array = array.sort((a,b) => {
			return Date.parse( a[property] ) < Date.parse( b[property] ) ? 1 : 0 ;
			})
		}

		return array;
	} else return array;
}


export { getIndex, findIndex, chainFilters, dateFilter};