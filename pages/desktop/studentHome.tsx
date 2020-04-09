import React from 'react';
import styled from 'styled-components';
import { Paper, Typography, GridList, GridListTile } from '@material-ui/core';
import LecturerTicket from '../../components/lecturerTicket';

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
    color: #121212;
    font-weight: 600;
    font-size: 1.5rem;
    padding: auto;
    text-align: center;
}
`;

const StyledGridList = styled(GridList)`
 && {
    padding-top: 2.5rem;
}
`;

const Ticket = styled(Paper)`
&& {
    background-color: rgba(236, 236, 236, 0.9);
    margin: 2rem;
    height: auto;
    width: auto;   
}
`;

const StudentHome: React.FunctionComponent = (): JSX.Element => {

    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <StyledPaper elevation={3}>
            <Title width={1}>
                Vaši predavači
            </Title>
            <StyledGridList>
                {list.map((num) =>
                    <GridListTile key={num}>
                        <Ticket elevation={3}>
                            <LecturerTicket>
                            {num}
                            </LecturerTicket>
                        </Ticket>
                    </GridListTile>)}
            </StyledGridList>
        </StyledPaper>
    );
}

export default StudentHome;
