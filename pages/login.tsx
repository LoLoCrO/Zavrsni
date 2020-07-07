import React from 'react';
import LoginForm from '../components/loginForm/loginForm';
import { LoginValues } from '../src/ts/interfaces/login.interface';
import axios from 'axios';
import Router from 'next/router';

const Login: React.FunctionComponent = (): JSX.Element => {

    const app = `http://localhost:3000`;

    const login = ({ email, password }: LoginValues) => {
        console.log(email, password)
        axios({
            method: 'post',
            url: `${app}/api/auth`,
            data: { email, password }
        })
            .then((res) => {
                if (res.data.user.role === 'student') {
                    Router.push({ pathname: '/studentHome', query: { user: JSON.stringify(res.data.user) }, })
                } else {
                    Router.push({ pathname: '/adminHome', query: { user: JSON.stringify(res.data.user) }, })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<LoginForm onSubmit={login} />);
}

export default Login;
