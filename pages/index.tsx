
import React from 'react';
import LoginForm from '../components/loginForm';

const Index = () => <LoginForm
    onSubmit={({ email, password }) => {
        console.log(email, password)
    }}
/>

export default Index;
