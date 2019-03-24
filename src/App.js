import React, {Component} from 'react';
import {
    ReactiveBase,
    CategorySearch,
    RatingsFilter,
    ResultCard
} from '@appbaseio/reactivesearch';
import {Link} from "react-router-dom";

class App extends Component {
    onData(res) {
        const result = {
            image: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
            title: res.name,
            rating: res.rating,
            desc: res.brand,
            url: "#"
        };
        return result;
    }

    render() {
        return (
            <div>
                <a className="btn btn-primary" size="lg">
                    Tell Me More About you
                </a>{' '}
                <br/>
                <Link to="/survey">Take the Survey!</Link>
            </div>
        );
    }
}

export default App;
