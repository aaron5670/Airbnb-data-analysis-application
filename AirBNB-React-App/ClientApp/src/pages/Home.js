import React, {Component} from 'react';
import {signinRedirect} from "../services/userServices";

export const Home = () => {
    async function login() {
        // signinRedirect()

        try {
            const formData = new FormData();
            formData.append('client_id', 'client');
            formData.append('client_secret', 'secret');
            formData.append('grant_type', 'password');
            formData.append('username', 'alice');
            formData.append('password', 'alice');
            formData.append('scope', 'openid api1');

            const options = {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            const response = await fetch('https://localhost:5001/connect/token', options);
            const body = await response.json();
            if (response.ok) {
                console.log(body)
            } else {
                console.log(response)
                console.log(body)
                throw new Error();
            }
        } catch (err) {
            console.log(err)
        }

    }
    

    return (
        <div>
            <h1>Hello, world!</h1>
            <button onClick={() => login()}>Login</button>
        </div>
    );
}
