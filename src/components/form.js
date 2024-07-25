import React from "react";
import { useState } from "react";
import "./form.css";
import List from "./List";
import arrCombiner from "./arr_combiner";


let dateValue = '';            // начальное значение даты
let distanceValue = '';        // начальное значение дистанции

export default function Form() {  // КОМПОНЕНТ Формы
  
  const [form, setForm] = useState({ // перечисляем все изменяемые параметры внутри формы
    date_input: '',
    distance_input: '',
  });

  const [itemsObj, setItemsObj] = useState([]); // массив объектов, передаваемыех в компонент <List />

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('input[type="date"]').focus();
  });
  
  const handleDateChange = evt => { // функция обработки набора символов внутри input-а "ДАТА"
    
    setForm(prevForm => ({...prevForm, date_input: evt.target.value}));
    
  }

  const handleDistanceChange = evt => { // функция обработки набора символов внутри input-а "Пройдено км"

    setForm(prevForm => ({...prevForm, distance_input: evt.target.value}));

  }
  
  const handleSubmit = evt => { // обработка нажатия "Enter"
    evt.preventDefault();
    if ((dateValue !== '') && (distanceValue !== '')) { // если все поля "input" корректно заполнены
      
      let tempArr = arrCombiner(form.date_input, form.distance_input);
      setItemsObj(prevItemsObj => tempArr);
      
      setForm(prevForm => ({ distance_input: '', date_input: '' }));
      document.querySelector('input[type="date"]').focus();
    };
  };

  const handleClick = evt => { // ОБРАБОТКА НАЖАТИЯ КНОПКИ "добавить"
    
    if ((dateValue !== '') && (distanceValue !== '')) { // если все поля "input" корректно заполнены
      
      let tempArr = arrCombiner(form.date_input, form.distance_input);
      setItemsObj(prevItemsObj => tempArr);
      
      setForm(prevForm => ({ distance_input: '', date_input: '' }));
      document.querySelector('input[type="date"]').focus();
    };
  };

  const handleRemove = evt => {  // ОБРАБОТКА НАЖАТИЯ КРЕСТИКА "удалить", передаваемая в компонент <List /> 
    const { target } = evt;
    const id = target.parentElement.id;
    console.log('removed ID = ', id);   // КОНТРОЛЬНАЯ ТОЧКА
    setItemsObj(itemsObj.filter(o => o.id !== id));
  };

  return (
    <main className="content">
        <div className="card">
          <div className="tasks" id="tasks">
            <form className="tasks__control" onSubmit={handleSubmit} id="tasks__form">
              <label htmlFor="date_input">Дата (ДД.ММ.ГГ)
                <input 
                  type="text" 
                  className="tasks__input" 
                  name="date_input" 
                  id="date__input" 
                  placeholder="Введите датау"
                  value={form.date_input}
                  onChange={handleDateChange} />
              </label>
              <label htmlFor="distance_input">Пройдено км
                <input type="text" 
                  className="tasks__input" 
                  name="distance_input" 
                  id="distance__input" 
                  placeholder="Введите кол-во КМ"
                  value={form.distance_input}
                  onChange={handleDistanceChange} />
              </label>
              <button className="tasks__add" onClick={handleClick} id="tasks__add">Добавить</button>
            </form>
            <List itemsObj={itemsObj} onRemove={handleRemove}/>
          </div>
        </div>
    </main>
  );
};

List.defaultProps = {
  dataArr: []
  };

