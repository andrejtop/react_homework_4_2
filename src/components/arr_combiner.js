import { nanoid } from 'nanoid'

let listArray = []; // дефолтное значение списка занятий

export default function arrCombiner(dateValue, distanceValue) { // функция-сборщик целевого массива (для передачи в компонент <List>)

    //  ## Преобразование пользовательской строки к формату даты ##
    const year = dateValue.slice(6);
    const month = dateValue.slice(3,5);
    const day = dateValue.slice(0,2);
    console.log('DATE:', new Date(`20${year}-${month}-${day}`));
    console.log('DATEparse:', Date.parse(new Date(`20${year}-${month}-${day}`)))
    const date = new Date(`20${year}-${month}-${day}`);
    // ##  ##

    const distance = parseFloat(distanceValue);

    console.log('props: ', dateValue, distance);
    console.log('-------------------------------------');

    const updatedItemArray = {id: nanoid(), date_str: dateValue, date_obj: date, distance: distance }; // формируем из входящего параметра новый/обновлённый элемент списка

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
            };
        };

        if (Date.parse(updatedItemArray.date_obj) > (Date.parse(listArray[0].date_obj))) { // добавляем новый элемент в начало списка
                console.log('pars updItem = ', Date.parse(updatedItemArray.date_obj));
                console.log('listArray[0] = ', Date.parse(listArray[0].date_obj));
                listArray.unshift(updatedItemArray);
                return listArray;
        };

        if (listArray.length > 1) {
            for (let m = 1; m < listArray.length; m++) {    // если замены элемента не было и не было вставки в начало списка

                if ((Date.parse(updatedItemArray.date_obj) < (Date.parse(listArray[m-1].date_obj))) && 
                    (Date.parse(updatedItemArray.date_obj) > (Date.parse(listArray[m].date_obj)))) {
                        console.log('pars updItem = ', Date.parse(updatedItemArray.date_obj));
                        console.log('listArray[middle] = ', Date.parse(listArray[m].date_obj));
                        listArray.splice(m, 0, updatedItemArray);   // добавляем новый элемент в середину списка
                    return listArray;    
                };
            };
        };

        if (Date.parse(updatedItemArray.date_obj) < (Date.parse(listArray[listArray.length-1].date_obj))) { // добавляем новый элемент в конец списка
            console.log('pars updItem = ', Date.parse(updatedItemArray.date_obj));
            console.log('listArray[end] = ', Date.parse(listArray[listArray.length-1].date_obj));
            listArray.push(updatedItemArray);
            return listArray;
        };
                
    } else listArray.push(updatedItemArray);    // добавляем новый элемент в пустой список
   
    return listArray;
};