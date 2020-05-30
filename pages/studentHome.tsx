import React from 'react';
import LecturerTicket from '../components/lecturerTicket';
import { StyledPaper, Title, StyledContainer, Ticket } from '../lib/styles/studentHome';

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
