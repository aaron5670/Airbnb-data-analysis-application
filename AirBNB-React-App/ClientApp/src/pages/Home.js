import React, {Component} from 'react';
import {authContext} from "../adalConfig";

export const Home = () => {

    console.log(authContext.getCachedUser())
    
    return (
        <div>
            <h1>Hello, world!</h1>
        </div>
    );
}
