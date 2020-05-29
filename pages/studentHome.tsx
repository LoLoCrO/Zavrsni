import React from 'react';
import styled from 'styled-components';
import { Paper, Typography, Container } from '@material-ui/core';
import LecturerTicket from '../components/lecturerTicket';

const StyledPaper = styled(Paper)`
    && {
        width: 80vw;
        background-color: white;
        margin: 5vw;
        margin-top: 2rem;
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
        margin-top: 2rem;
        text-align: center;
        border-radius: 10px;
        text-shadow: 2px 2px 4px #6e6e6e;
    }
`;

const StyledContainer = styled(Container)`
    && {
        padding: 0;
    }
`;

const Ticket = styled(Paper)`
    && {
        background-color: #ececec;
        margin: 2rem;
        height: auto;
        width: auto;   

        @media (min-width: 768px) {
            width: 40%; 
            display: inline-block;
        }
    }
`;

const StudentHome: React.FunctionComponent = (): JSX.Element => {

    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <StyledPaper elevation={3}>
            <Title width={1}>
                Vaši predavači
            </Title>
            <StyledContainer>
                {list.map((num: number) =>
                    <Ticket key={num} elevation={3}>
                        <LecturerTicket>
                            {num}
                        </LecturerTicket>
                    </Ticket>)}
            </StyledContainer>
        </StyledPaper>
    );
}

export default StudentHome;
