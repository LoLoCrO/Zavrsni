
import React from 'react';
import LoginForm from '../components/loginForm/loginForm';
import { LoginValues } from '../src/ts/interfaces/login.interface';

const Index = () => <LoginForm
    onSubmit={({ email, password }: LoginValues) => {
        console.log(email, password)
    }}
/>

export default Index;
