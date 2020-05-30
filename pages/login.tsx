import React from 'react';
import LoginForm from '../components/loginForm/loginForm';
import { LoginValues } from '../src/ts/interfaces/login.interface';

const Login: React.FunctionComponent = (): JSX.Element => {

    const submitForm = ({ email, password }: LoginValues) => {
        console.log(email, password);
    };

    return (<LoginForm onSubmit={submitForm} />);
}

export default Login;
