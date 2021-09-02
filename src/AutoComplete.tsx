import React, { useState, useRef, useEffect, useMemo } from 'react';
import AutoCompleteItem from './AutoCompleteItem';

const AutoComplete = (props: Record<string, any>): JSX.Element => {
    const { data, onSelect } = props;
    const [isVisible, setVisiblity] = useState(false);
    const [search, setSearch] = useState('');
    const [cursor, setCursor] = useState(-1);

    const showResults = (): void => setVisiblity(true);
    const hideResults = (): void => setVisiblity(false);

    const searchContainer = useRef<HTMLDivElement>(null);
    const searchResultRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);

        return (): void => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const scrollIntoView = (position: number): void => {
        console.log('POSITION', position);
        if (searchResultRef.current !== null && searchResultRef?.current?.parentNode !== null) {
            // (searchResultRef.current.parentNode as HTMLElement).scrollTo({
            //     top: position,
            //     behavior: 'smooth',
            // });
            // (searchResultRef.current.children[cursor] as HTMLElement).scrollIntoView({
            //     behavior: 'smooth',
            // });
            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            hideResults();
            return;
        }

        if (searchResultRef.current !== null) {
            const listItems = Array.from(searchResultRef.current.children);
            listItems[cursor] && scrollIntoView((listItems[cursor] as HTMLElement).offsetTop);
        }
    }, [cursor]);

    const suggestions = useMemo(() => {
        if (!search) return data;

        setCursor(-1);
        scrollIntoView(0);

        return data.filter((item: { name: string }) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    const handleClickOutside = (event: { target: any }): void => {
        console.log(console.log('ev', event.target));
        if (searchContainer.current !== null) {
            if (!searchContainer.current.contains(event.target)) {
                setCursor(-1);
                hideResults();
            }
        }
    };

    const keyboardNavigation = (e: React.KeyboardEvent<Element>): void => {
        if (e.key === 'ArrowDown') {
            isVisible
                ? setCursor((c) => (c < suggestions.length - 1 ? c + 1 : c))
                : (showResults(), setCursor(0));

            // console.log(cursor);

            // if (searchResultRef.current !== null) {
            //     const listItems = Array.from(searchResultRef.current.children);
            //     listItems[cursor] && scrollIntoView((listItems[cursor] as HTMLElement).offsetTop);
            // }
        }

        if (e.key === 'ArrowUp') {
            setCursor((c) => (c > 0 ? c - 1 : -1));
        }

        if (e.key === 'Escape') {
            hideResults();
        }

        if (e.key === 'Enter' && cursor >= 0) {
            setSearch(suggestions[cursor].name);
            hideResults();
            onSelect(suggestions[cursor]);
        }
    };

    return (
        <div style={{ width: '400px', margin: '0 auto', padding: '1rem' }} ref={searchContainer}>
            <div>Item Index: {cursor}</div>
            <div>Item Query: {search}</div>
            <input
                type="text"
                name="search"
                className="c-input"
                autoComplete="off"
                value={search}
                //onClick={showResults}
                onChange={(e: React.ChangeEvent): void => {
                    showResults();
                    setSearch((e.target as HTMLInputElement).value);
                }}
                onKeyDown={(e: React.KeyboardEvent): void => keyboardNavigation(e)}
            />

            <div className={`search-result ${isVisible ? 'visible' : 'invisible'}`}>
                {isVisible && (
                    <ul className="list-group" ref={searchResultRef}>
                        {suggestions.map((item: Record<string, any>, idx: number) => (
                            <AutoCompleteItem
                                key={item.name}
                                onSelectItem={(): void => {
                                    hideResults();
                                    setSearch(item.name);
                                    onSelect(item);
                                }}
                                isHighlighted={cursor === idx ? true : false}
                                {...item}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AutoComplete;
