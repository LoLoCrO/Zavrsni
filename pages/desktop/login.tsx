import React from 'react';
import LoginForm, { LoginValues } from '../../components/loginForm';

const Login: React.FunctionComponent = (): JSX.Element => {

    const submitForm = ({ email, password }: LoginValues) => {
        console.log(email, password);
    };

    return (<LoginForm onSubmit={submitForm} />);
}

export default Login;
