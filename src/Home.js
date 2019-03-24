import React, {Component} from 'react';
import App from './App';
import './App.css';
import './index.css'
import Contact from './components/Contact';
import {Link} from 'react-router-dom';
import TopMenu from './components/TopMenu'

class Home extends Component {
    // calls the login method in authentication service
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     displayContact: false
    //   }
    // }
    login = () => {
        this.props.auth.login();
    }
    // calls the logout method in authentication service
    logout = () => {
        this.props.auth.logout();
    }


    contact() {
        return <Contact/>
    }


    render() {

        // calls the isAuthenticated method in authentication service
        const {isAuthenticated} = this.props.auth;
        const contact = <Contact/>;
        const logoutName = "Log Out";
        const loginName = "Login";
        return (
            <div>
                {
                    isAuthenticated() &&
                    <div>
                        <TopMenu
                            func={this.logout}
                            buttonName={logoutName}/>

                        <App/>
                    </div>
                }
                {
                    !isAuthenticated() && (
                        <div>
                            <TopMenu
                                func={this.login}
                                buttonName={loginName}/>
                            <div>
                            </div>

                        </div>
                    )
                }
            </div>
        );
    }
}

export default Home;
