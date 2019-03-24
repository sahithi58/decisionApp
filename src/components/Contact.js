import React, {Component} from 'react';
import './Contact.css'

export default class Contact extends Component {
    render() {
        {
            console.log("In dicc");
        }
        return (

            <div className="container">
                <div className="colss">
                    <h2>Contact Us</h2>
                    <p>Swing by for a cup of coffee, or leave us a message:</p>
                </div>
                <div className="row">
                    <div className="column">
                        <img
                            src={require('../resources/safe_icon.jpeg')} className='resizeImage'/>
                    </div>
                    <div className="column">
                        <form action="/action_page.php">
                            <label for="fname">First Name</label>
                            <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
                            <label for="lname">Last Name</label>
                            <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                            <label for="country">Country</label>
                            <select id="country" name="country">
                                <option value="australia">Australia</option>
                                <option value="canada">Canada</option>
                                <option value="usa">USA</option>
                            </select>
                            <label for="subject">Subject</label>
                            <textarea id="subject" className="textSize" name="subject"
                                      placeholder="Write something.."></textarea>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

