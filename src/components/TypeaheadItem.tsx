import React from 'react';

const TypeaheadItem = (props: Record<string, any>): JSX.Element => {
    const { customText, isHighlighted, onSelectItem, text } = props;
    return (
        <li
            className={`list-group-item ${isHighlighted ? 'active highlighted' : ''}`}
            onClick={onSelectItem}
        >
            {customText ? customText : text}
        </li>
    );
};

export default TypeaheadItem;
