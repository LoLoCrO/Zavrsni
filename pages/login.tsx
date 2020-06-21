import React from 'react';
import LoginForm from '../components/loginForm/loginForm';
import { LoginValues } from '../src/ts/interfaces/login.interface';
import axios from 'axios';

const Login: React.FunctionComponent = (): JSX.Element => {

    const app = `http://localhost:3000`;

    const login = ({ email, password }: LoginValues) => {
        console.log(email, password)
        axios({
            method: 'post',
            url: `${app}/api/auth`,
            // headers: {},
            data: { email, password }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<LoginForm onSubmit={login} />);
}

export default Login;
