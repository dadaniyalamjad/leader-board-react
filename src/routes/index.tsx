import React, { Fragment, lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';

const MainApp = lazy(() => import("../screens/MainScreen"))

interface MyState {
    token: any; 
};
interface myProps {
    // count: number; // like this
};

class Routes extends React.Component<myProps, MyState> {

    render() {
        // const { token, isAuth } = this.state
        return (
            <Fragment>
                <Router>
                    <Suspense fallback={<CircularProgress />}>
                        <Switch>
                            <HashRouter>
                                <Route exact path="/" component={MainApp} />
                            </HashRouter>
                        </Switch>
                    </Suspense>
                </Router>
            </Fragment>
        )
    }
}
export default Routes
