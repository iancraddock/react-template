import React from 'react';

const AutoCompleteItem = (props: Record<string, any>): JSX.Element => {
    const { name, onSelectItem, isHighlighted } = props;
    return (
        <li
            className={`list-group-item ${isHighlighted ? 'active highlighted' : ''}`}
            onClick={onSelectItem}
        >
            {name}
        </li>
    );
};

export default AutoCompleteItem;
