import React from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import Map from './pages/Map';
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import {authContext} from "./adalConfig";
import './custom.css'

const App = () => {
    const user = authContext.getCachedUser();
    
    return (
        <Layout>
            <Route exact path='/' component={Map}/>
            <ProtectedRoute exact path='/dashboard' user={user} component={Dashboard}/>
            <Route exact path='/unauthorized' component={Unauthorized}/>
        </Layout>
    );
}

export default App