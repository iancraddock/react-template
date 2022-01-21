import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Test2 from './Test2';
import Test from './Test';
import Paths from './routes';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<App />} />
            {/* <Route path={Paths.Home} element={<Home />} /> */}
            <Route path={Paths.Test} element={<Test />} />
            <Route path={Paths.Test2} element={<Test2 />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
