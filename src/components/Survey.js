import React from 'react';
import {Route, Router} from 'react-router-dom';
import './Survey.css'
import TopMenu from "../Home";
import axios from 'axios';

// calls the logout method in authentication service
// const logout = () => {
//     this.props.auth.logout();
// }

class Survey extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            score:0,

        }
    }
   
    logout = () => {
        this.props.auth.logout();
    }
    submitSurvey=(score)=>{
        let emailId=this.props.auth.getCurrentUser();
        let type;
        if(score<=2){
            type=1;
        }
        else if(score>=8){
            type=3;
        }
        else{
            type=2;
        }
        const user={
            username:emailId ,	
            type:type
        }

        axios.post('https://shebotbackend-91567.firebaseio.com/users.json', user)
        .then(response=>{alert(response)
     
        })
        .catch(error=>{alert(error)
        });
    }
    render() {
        const logoutName = 'Log Out';
        return (

            <div className="container">
                {/*<TopMenu*/}
                {/*func={this.props.auth.logout()}*/}
                {/*buttonName={logoutName}/>*/}
                <div className={`row alert ${this.props.alertType}`} role="alert">
                    Hello World
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                                <div className="row left-padding-5">
                                    <label htmlFor="usernameFld"> As a student, you would rather </label>
                                </div>
                                <div className="form-group row no-left-padding">
                                    <select className="form-control" onChange={event=>{

                                        
                                        let currentScore=this.state.score+parseInt(event.target.value);
                                        
                                        this.setState({
                                            score:currentScore
                                        })

                                    }}>
                                        <option value="0" selected="selected">Listen to an interesting lecture
                                        </option>
                                        <option value="2">Participate in a discussion</option>
                                    </select>
                                </div>
                                <div className="row left-padding-5">
                                    <label htmlFor="usernameFld"> You just met someone new. How would they
                                        most likely
                                        describe you? </label>
                                </div>
                                <div className="form-group row no-left-padding">
                                    <select className="form-control" onChange={event=>{
                                        let currentScore=this.state.score+parseInt(event.target.value);
                                        
                                        this.setState({
                                            score:currentScore
                                        })

                                    }}>
                                        <option value="0" selected="selected" >Quite, Reserved and Calm</option>
                                        <option value="2">Outgoing, Talkative and Friendly</option>
                                    </select>
                                </div>
                                <div className="row left-padding-5">
                                    <label htmlFor="usernameFld"> How do you feel about meeting new
                                        people?</label>
                                </div>
                                <div className="form-group row no-left-padding">
                                    <select className="form-control" onChange={event=>{
                                        let currentScore=this.state.score+parseInt(event.target.value);
                                        this.setState({
                                            score:currentScore
                                        })

                                    }}>
                                        <option value="2" >It's exciting and interesting!
                                        </option>
                                        <option value="0" selected="selected">It's tiring and little nerve wrecking :/</option>
                                    </select>
                                </div>
                                <div className="row left-padding-5">
                                    <label htmlFor="usernameFld"> You need to vent out about your terrible day
                                        at work. What
                                        do you do?</label>
                                </div>
                                <div className="form-group row no-left-padding">
                                    <select className="form-control" onChange={event=>{
                                        let currentScore=this.state.score+parseInt(event.target.value);
                                        this.setState({
                                            score:currentScore
                                        })

                                    }}>
                                        <option value="0" selected="selected">Text someone.</option>
                                        <option value="2">Call someone.</option>
                                    </select>
                                </div>

                                <div className="row left-padding-5">
                                    <label htmlFor="usernameFld"> Which of the following ibest describes
                                        you?</label>
                                </div>
                                <div className="form-group row no-left-padding">
                                    <select className="form-control" onChange={event=>{
                                        let currentScore=this.state.score+parseInt(event.target.value);
                                        this.setState({
                                            score:currentScore
                                        })

                                    }}>
                                        <option value="2" >It is difficult for me to listen for a
                                            longer
                                            period of time
                                        </option>
                                        <option value="0" selected="selected">People say I am a good listener</option>
                                    </select>
                                </div>

                                <div className="form-group row">
                                    <label className="col-2"> </label>
                                    <div className="col-sm-10">
                                        <button id="signUp"
                                                className="btn btn-primary btn-block"
                                                onClick={() => this.submitSurvey(this.state.score)}
                                        >Submit
                                        </button>
                                    </div>
                                </div>
                           
                        </div>
                    </div>
                </div>


            </div>

        )
            ;
    }
}


export default Survey;
