import React, { useState } from 'react';
import Typeahead from './components/Typeahead';

export default function Home(): JSX.Element {
    const [item, setItem] = useState('');

    return (
        <div>
            <h1>Welcome to the Home page.</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat
                odio facilisis mauris. Ultrices neque ornare aenean euismod elementum nisi quis.
                Urna id volutpat lacus laoreet non curabitur gravida arcu.
            </p>
            {/* <AutoComplete
                data={[
                    { id: 1, name: 'bob' },
                    { id: 2, name: 'dave' },
                    { id: 3, name: 'steve' },
                    { id: 4, name: 'steven' },
                    { id: 5, name: 'stevi' },
                    { id: 6, name: 'stevy' },
                    { id: 7, name: 'stevey' },
                    { id: 8, name: 'steveie' },
                    { id: 9, name: 'ace' },
                    { id: 10, name: 'base' },
                    { id: 11, name: 'space' },
                    { id: 12, name: 'yace' },
                    { id: 13, name: 'yace1' },
                    { id: 14, name: 'yace2' },
                    { id: 15, name: 'yace3' },
                    { id: 16, name: 'yace4' },
                ]}
                onSelect={(item: React.SetStateAction<string>): void => setItem(item)}
            /> */}

            {`ITEM STATE: ${JSON.stringify(item)}`}

            <Typeahead
                options={[
                    { value: 1, text: 'bob' },
                    { value: 2, text: 'dave' },
                    { value: 3, text: 'steve' },
                    { value: 4, text: 'steven' },
                    { value: 5, text: 'stevi' },
                    { value: 6, text: 'stevy' },
                    { value: 7, text: 'stevey' },
                    { value: 8, text: 'steveie' },
                    { value: 9, text: 'ace' },
                    { value: 10, text: 'base' },
                    { value: 11, text: 'space' },
                    { value: 12, text: 'yace' },
                    { value: 13, text: 'yace1' },
                    { value: 14, text: 'yace2' },
                    { value: 15, text: 'yace3' },
                    { value: 16, text: 'yace4' },
                ]}
                onSelect={(item: React.SetStateAction<string>): void => setItem(item)}
            />
        </div>
    );
}
