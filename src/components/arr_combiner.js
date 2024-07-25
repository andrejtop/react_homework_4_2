import { nanoid } from 'nanoid'

let listArray = []; // дефолтное значение списка занятий

export default function arrCombiner(dateValue, distanceValue) { // функция-сборщик целевого массива (для передачи в компонент <List>)
    const date = new Date(dateValue);
    const distance = Number(distanceValue);

    console.log('props: ', dateValue, distance);
    console.log('-------------------------------------');

    const updatedItemArray = { id: nanoid(), date_str: dateValue, date_obj: date, distance: distance }; // формируем из входящего параметра новый/обновлённый элемент списка

    console.log('updated Element is:');
    console.dir(updatedItemArray);  // КОНТРОЛЬНАЯ ТОЧКА
    console.log('=====================================');

    if (listArray.length !== 0) {
        console.log('listArray current length = ', listArray.length)    // КОНТРОЛЬНАЯ ТОЧКА

        for (let i = 0; i < listArray.length; i++) {    // поиск элемента с такой же датой
            if (listArray[i].date_str === dateValue) {
                const previouslyCompletedDistance = listArray[i].distance;
                updatedItemArray.distance = distance + previouslyCompletedDistance; // прибавляем ранее пройденную дистанцию к новому значению
                listArray.splice(i, 1, updatedItemArray); // заменяем текущий элемент на обновлённый
                return listArray;
            }
        }

        if (updatedItemArray.date_obj.getTime() > listArray[0].date_obj.getTime()) { // добавляем новый элемент в начало списка
            listArray.unshift(updatedItemArray);
            return listArray;
        }

        for (let m = 1; m < listArray.length; m++) {    // если замены элемента не было и не было вставки в начало списка
            if ((updatedItemArray.date_obj.getTime() < listArray[m-1].date_obj.getTime()) && 
                (updatedItemArray.date_obj.getTime() > listArray[m].date_obj.getTime())) {
                    listArray.splice(m, 0, updatedItemArray);   // добавляем новый элемент в середину списка
                return listArray;    
            }
        }

        if (updatedItemArray.date_obj.getTime() < listArray[listArray.length-1].date_obj.getTime()) { // добавляем новый элемент в конец списка
            listArray.push(updatedItemArray);
            return listArray;
        }
                
    } else listArray.push(updatedItemArray);    // добавляем новый элемент в пустой список
   
    return listArray;
}