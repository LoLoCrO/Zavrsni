import React from 'react';
import TemporaryDrawer from '../components/drawer';
import FullWidthTabs from '../components/adminTabs';
import { StyledPaper, TemporaryDrawerWrapper, Title } from '../lib/styles/adminHome';
import { NextPage } from 'next';

const AdminHome: NextPage = (): JSX.Element =>
    <StyledPaper elevation={3}>
        <TemporaryDrawerWrapper>
            <TemporaryDrawer />
        </TemporaryDrawerWrapper>
        <Title width={1}>
            Vaši predavači
        </Title>
        <FullWidthTabs />
    </StyledPaper>;

AdminHome.getInitialProps = async ({ query }: any) => {

    console.log("adminHome query", query);

    const admin = await JSON.parse(query.user);

    // const res = await axios.get('http://localhost:3000/api/students/lecturers', {
    //     params: {
    //         _id
    //     }
    // })
    //     .then(res => {
    //         console.log(res)
    //         return res;
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         return err;
    //     });

    // await console.log('axios lecturers', res.data)

    return admin;
}

export default AdminHome;
