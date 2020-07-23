import React from 'react';
import TemporaryDrawer from '../components/drawer';
import FullWidthTabs from '../components/adminTabs';
import { StyledPaper, TemporaryDrawerWrapper, Title } from '../lib/styles/adminHome';
import axios from 'axios';
import { NextPage } from 'next';
import Router from 'next/router';

const AdminHome: NextPage = ({ professors }: any): JSX.Element => {

    if (process.browser) {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token && Router || role !== 'admin') { Router.push('/login') };
    }

    return (
        <StyledPaper elevation={3}>
            <TemporaryDrawerWrapper>
                <TemporaryDrawer type='admin' />
            </TemporaryDrawerWrapper>
            <Title width={1}>
                Vaši predavači
        </Title>
            <FullWidthTabs
                professors={professors}
            />
        </StyledPaper>
    )
};

AdminHome.getInitialProps = async ({ res }: any) => {

    const { professors } = await axios.get('http://localhost:3000/api/professors')
        .then(res => {
            if (!res.data.success) {
                window.alert('Doslo je do pogreske!')
                console.log(res)
            }
            return res.data;
        })
        .catch(err => {
            window.alert('Doslo je do pogreske!')
            console.log(err)
            return res.redirect('/login');
        });

    return { professors };
}

export default AdminHome;
