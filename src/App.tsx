import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CSSTransition } from 'react-transition-group';

// function App(): JSX.Element {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }

const App = (): JSX.Element => {
    const [inProp, setInProp] = useState(false);
    const toggle = (): void => setInProp(!inProp);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <CSSTransition in={inProp} timeout={2000} classNames="my-node">
                <div>{"I'll receive my-node-* classes"}</div>
            </CSSTransition>
            <button type="button" onClick={(): void => toggle()}>
                Click to Enter
            </button>
        </div>
    );
};

export default App;
