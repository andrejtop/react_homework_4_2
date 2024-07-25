// List.js
import React from 'react';
import ListItem from './Listitem';

export default function List(props) {
    const { itemsObj, onRemove: handleRemove } = props;

    return (
        <div className="tasks__list" id="tasks__list">
            {itemsObj.map((itemOfList) => (
                <ListItem key={itemOfList.id} {...itemOfList} onRemove={handleRemove} />
            ))}
        </div>
    );
}