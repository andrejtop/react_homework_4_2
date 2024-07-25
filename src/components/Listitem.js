import React from 'react';

export default function ListItem({ id, date_str, distance, onRemove }) {
    return (
        <div key={id} className="task" id={id}>
            <div className="task__title">{date_str}</div>
            <div className="task__title">{distance}</div>
            <a href="#" className="task__edit">&#9998;</a>
            <a href="#" className="task__remove" onClick={onRemove}>&times;</a>
        </div>
    );
}