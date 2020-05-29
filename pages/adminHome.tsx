import React from 'react';
import styled from 'styled-components';
import { Paper, Typography } from '@material-ui/core';
import LecturerTicket from '../components/lecturerTicket';
import TemporaryDrawer from '../components/drawer';
import FullWidthTabs from '../components/adminTabs';

const StyledPaper = styled(Paper)`
 && {
    position: relative;
    background-color: white;
    margin-top: 2.5rem;
    border-radius: 10px;
    display: table;
    width: 85vw;
    @media (min-width: 768px) {
        margin: 2.5rem;
    }
}
`;

const Title: any = styled(Typography)`
 && {
    color: #646464;
    font-weight: 600;
    font-size: 1.5rem;
    padding: auto;
    margin: 2rem;
    text-align: center;
    border-radius: 10px;
    text-shadow: 2px 2px 4px #6e6e6e;
}
`;

const TemporaryDrawerWrapper = styled.div`
 && {
    margin-top: 1rem;
    margin-left: 1.3rem;
}
`;

const AdminHome: React.FunctionComponent = (): JSX.Element => {

    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <StyledPaper elevation={3}>
            <TemporaryDrawerWrapper>
                <TemporaryDrawer />
            </TemporaryDrawerWrapper>
            <Title width={1}>
                Vaši predavači
                </Title>
            <FullWidthTabs />
        </StyledPaper>
    );
}

export default AdminHome;
