import React, { useState, useRef, useEffect, useMemo } from 'react';
import TypeaheadItem from './TypeaheadItem';

interface TypeaheadProps {
    options: {
        value: number;
        text: string;
    }[];
    onSelect: (item?: any) => void;
}

const Typeahead = ({ options, onSelect }: TypeaheadProps): JSX.Element => {
    const [isVisible, setVisiblity] = useState(false);
    const [query, setQuery] = useState('');
    const [cursor, setCursor] = useState(-1);

    const showResults = (): void => setVisiblity(true);
    const hideResults = (): void => setVisiblity(false);

    const typeaheadWrapper = useRef<HTMLDivElement>(null);
    const resultsWrapper = useRef<HTMLUListElement>(null);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);

        return (): void => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function isElementInViewport(el: HTMLElement): boolean {
        const rect = el.getBoundingClientRect();

        return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left <
                (window.innerWidth ||
                    document.documentElement.clientWidth) /* or $(window).width() */ &&
            rect.top <
                (window.innerHeight ||
                    document.documentElement.clientHeight) /* or $(window).height() */
        );
    }

    const scrollIntoView = (position: number): void => {
        //console.log({ position: position, window: window.innerHeight });

        if (resultsWrapper.current !== null) {
            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (cursor < 0 || cursor > optionsResults.length || !resultsWrapper) {
            hideResults();
            return;
        }

        if (resultsWrapper.current !== null) {
            const listItems = Array.from(resultsWrapper.current.children);
            const currentItem = listItems[cursor] as HTMLElement;
            listItems[cursor] &&
                !isElementInViewport(currentItem) &&
                scrollIntoView(currentItem.offsetTop);
        }
    }, [cursor]);

    const optionsResults = useMemo(() => {
        if (!query) return options;

        setCursor(-1);
        scrollIntoView(0);

        return options.filter((item: { text: string }) =>
            item.text.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query]);

    const handleClickOutside = (event: { target: any }): void => {
        if (typeaheadWrapper.current !== null) {
            if (!typeaheadWrapper.current.contains(event.target)) {
                setCursor(-1);
                hideResults();
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<Element>): void => {
        if (e.key === 'ArrowDown') {
            isVisible
                ? setCursor((c) => (c < optionsResults.length - 1 ? c + 1 : c))
                : (showResults(), setCursor(0));

            //console.log(cursor);
        }

        if (e.key === 'ArrowUp') {
            setCursor((c) => (c > 0 ? c - 1 : -1));
        }

        if (e.key === 'Escape') {
            hideResults();
        }

        if (e.key === 'Enter' && cursor >= 0) {
            setQuery(optionsResults[cursor].text);
            hideResults();
            onSelect(optionsResults[cursor]);
        }
    };

    return (
        <div style={{ width: '400px', margin: '0 auto', padding: '1rem' }} ref={typeaheadWrapper}>
            <div>Item Index: {cursor}</div>
            <div>Item Query: {query}</div>
            <input
                type="text"
                name="query"
                className="c-input"
                autoComplete="off"
                value={query}
                //onClick={showResults}
                onChange={(e: React.ChangeEvent): void => {
                    showResults();
                    setQuery((e.target as HTMLInputElement).value);
                }}
                onKeyDown={(e: React.KeyboardEvent): void => handleKeyPress(e)}
            />

            <div className={`query-result ${isVisible ? 'visible' : 'invisible'}`}>
                {isVisible && (
                    <ul className="list-group" ref={resultsWrapper}>
                        {optionsResults.map((item: Record<string, any>, index: number) => (
                            <TypeaheadItem
                                key={item.text}
                                onSelectItem={(): void => {
                                    hideResults();
                                    setQuery(item.text);
                                    onSelect(item);
                                }}
                                isHighlighted={cursor === index ? true : false}
                                //customText={<h1>{item.text}</h1>}
                                {...item}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Typeahead;
