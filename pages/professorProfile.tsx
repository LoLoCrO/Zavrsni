import React from 'react';
import styled from 'styled-components';
import { Paper, Typography } from '@material-ui/core';

const StyledPaper = styled(Paper)`
    && {
        background-color: white;
        margin: 2.5rem;
        padding: 2.5rem;
        border-radius: 10px;
        display: table;
    }
`;

const Title: any = styled(Typography)`
    && {
        color: #666666;
        font-weight: 600;
        font-size: 1.5rem;
        padding: auto;
        text-align: center;
        border-radius: 10px;
        text-shadow: 2px 2px 4px #6e6e6e;
    }
`;

const Comments = styled.div`
    width: 100%;
    padding: 2rem;

`;

const StudentHome: React.FunctionComponent = (): JSX.Element => {

    const professor: Object = {
        firstName: 'Ivan',
        lastName: 'Ivic',
        title: 'Dr.sc.',
        email: 'ivan.ivic@mail.com',
        overallGrade: 3.7,
        grades: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
        comments: [
            'nesto nesto nesto nesto nesto nesto nesto nesto nesto nesto nesto',
            'nesto  nesto nesto nesto nesto nesto nesto',
            'nesto  nesto nesto nesto nesto',
            'nesto', 'nesto', 'nesto', 'nesto', 'nesto'
        ]
    };

    return (
        <StyledPaper elevation={3}>
            <Title width={1}>
                Vaši predavači
            </Title>

        </StyledPaper>
    );
}

export default StudentHome;
