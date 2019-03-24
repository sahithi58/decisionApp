import React from 'react';
import {Route, Router} from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import Auth from './auth';
import history from './history';
import Contact from './components/Contact';
import Survey from "./components/Survey";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
        alert("Inside routes:"+ sessionStorage.getItem("username"));
        
    }
}

const alertType = "d-none"

const Routes = () => (
    <Router history={history} component={Home}>
        <div>
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />}/>
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />}/>
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }}/>
            <Route path="/contact" render={() => <Contact/>}/>
            <Route exact path="/survey" render={(props) => <Survey alertType= {alertType}
                                                                        auth={auth} {...props}/>}/>
        </div>
    </Router>
);

export default Routes;
