import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import Map from './pages/Map';
import {Account} from "./pages/Account";
import './custom.css'

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Map}/>
                <Route path='/account' component={Account}/>
            </Layout>
        );
    }
}
