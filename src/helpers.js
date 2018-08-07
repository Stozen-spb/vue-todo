

	function alertSome(text) {
		alert(text);
	}

	function alertSome2(text) {
		alert(text + '222');
	}
	var foo = 'bar'

function getIndex(n){

  var d=((n|=0)+9)%10|0;

  return n/10%10^1&&d<4?+!d:2;

}

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

// пример использования:

// alert( ['дня', 'день', 'дней'][getIndex(12)] );
export {alertSome, alertSome2, foo, getIndex, findIndex};