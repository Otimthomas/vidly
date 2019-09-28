import React from 'react';

const ListGroup = ({items, onItemSelect, textProperty, valueProperty, itemSelected}) => {    
        return <ul className="list-group">
                {items.map(item => (
                    <li key={item[valueProperty]} 
                        className={item === itemSelected ? "list-group-item active": "list-group-item"}
                        onClick={() => onItemSelect(item)}>
                        {item[textProperty]}
                    </li>
                ))}
            </ul>
}

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
};
 
export default ListGroup;