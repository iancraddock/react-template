import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Test2 from './Test2';
import Test from './Test';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Paths from './routes';
import { pageRoutes } from './routes/Paths';

export default withRouter(({ location }) => {
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [direction, setDirection] = useState<string>('rtl');

    const childFactoryCreator = (props: { classNames: string; timeout: number }): any => (
        child: React.FunctionComponentElement<{
            classNames: string;
            timeout: number;
        }>
    ): any => React.cloneElement(child, props);

    const handleExit = (): void => {
        const currentID = pageRoutes.findIndex((path) => path.path === location.pathname);
        const targetID = pageRoutes.findIndex((path) => path.path === window.location.pathname);

        if (!currentID && !targetID) {
            return;
        }

        if (currentID < targetID) {
            setDirection('rtl');
        }

        if (currentID > targetID) {
            setDirection('ltr');
        }
    };

    useEffect(() => {
        const { pathname } = location;

        setCurrentPath(pathname);
    }, [location.pathname, direction]);

    return (
        <div className="App">
            <div>
                <Link to={Paths.Home}>Home</Link>
                {' - '}
                <Link to={Paths.Test}>Test</Link>
                {' - '}
                <Link to={Paths.Test2}>Test2</Link>
            </div>
            <div>
                <div>Current path: {currentPath}</div>
                <div>Current direction: {direction}</div>
            </div>
            <TransitionGroup
                childFactory={childFactoryCreator({
                    classNames: direction === 'ltr' ? 'slide-ltr' : 'slide-rtl',
                    timeout: 2500,
                })}
            >
                <CSSTransition
                    key={location.key}
                    classNames={direction === 'ltr' ? 'slide-ltr' : 'slide-rtl'}
                    timeout={2500}
                    onExit={handleExit}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            position: 'absolute',
                            width: '100%',
                        }}
                    >
                        <Switch location={location}>
                            <Route path={Paths.Home} exact component={Home} />
                            <Route path={Paths.Test} component={Test} />
                            <Route path={Paths.Test2} component={Test2} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
});
