import React from 'react';
import LoginForm from '../components/loginForm/loginForm';
import { LoginValues } from '../src/ts/interfaces/login.interface';
import axios from 'axios';
import Router from 'next/router';

const Login: React.FunctionComponent = (): JSX.Element => {

    if (process.browser) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    const app = `http://localhost:3000`;

    const login = async ({ email, password }: LoginValues) =>
        await axios({
            method: 'post',
            url: `${app}/api/auth`,
            data: { email, password }
        })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token);
                if (res.data.user.role === 'student') {
                    localStorage.setItem('role', 'student');
                    Router.push({ pathname: '/studentHome', query: { _id: res.data.user._id }, })
                } else {
                    localStorage.setItem('role', 'admin');
                    Router.push({ pathname: '/adminHome', query: { user: JSON.stringify(res.data.user) }, })
                }
            })
            .catch((err) => {
                console.log(err);
            });


    return (<LoginForm onSubmit={login} />);
}

export default Login;
