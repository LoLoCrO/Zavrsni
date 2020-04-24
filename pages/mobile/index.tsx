
import React from 'react';
import LoginForm, { LoginValues } from '../../components/loginForm';

const Index = () => <LoginForm
    onSubmit={({ email, password }: LoginValues) => {
        console.log(email, password)
    }}
/>

export default Index;
