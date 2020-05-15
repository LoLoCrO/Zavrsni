import React from 'react';
import styled from 'styled-components';
import { Paper, Typography, GridList, GridListTile } from '@material-ui/core';
import LecturerTicket from '../components/lecturerTicket';
import TemporaryDrawer from '../components/drawer';

const StyledPaper = styled(Paper)`
 && {
    position: relative;
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

const StyledGridList = styled(GridList)`
 && {
    padding-top: 2.5rem;
}
`;

const Ticket = styled(Paper)`
&& {
    background-color: #ececec;
    margin: 2rem;
    height: auto;
    width: auto;   
}
`;

const AdminHome: React.FunctionComponent = (): JSX.Element => {

    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <StyledPaper elevation={3}>
            <React.Fragment>
                <TemporaryDrawer />
                <Title width={1}>
                    Vaši predavači
                </Title>
            </React.Fragment>
            <StyledGridList>
                {list.map((num) =>
                    <GridListTile key={num}>
                        <Ticket elevation={3}>
                            <LecturerTicket>
                                {num}
                            </LecturerTicket>
                        </Ticket>
                    </GridListTile>
                )}
            </StyledGridList>
        </StyledPaper>
    );
}

export default AdminHome;
