import React from 'react';
import styled from 'styled-components';
import { Paper, Typography, GridList, Container } from '@material-ui/core';

const StyledPaper = styled(Paper)`
 && {
    background-color: white;
    width: 90vw;
    margin: 5vw;
    padding: 5vw;
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

const StyledContainer = styled(Container)`
 && {
    padding: 0;
    padding-top: 5vh;
}
`;

const LecturerBox = styled(Container)`
    && {
        background-color: #ececec;
        height: 25vh;
        padding: 3vh;
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        margin-bottom: 5vw;
    }
`;

const LecturerPhoto = styled.div`
    && {
        height: 15vh;
        width: 15vh;
        align-self: flex-start;
    }
`;

const LecturerInfo = styled.div`
    && {
        display: flex;
        text-align: end;
        height: 15vh;
        width: 50vw;
        overflow: hidden;
        white-space: nowrap;
        align-items: flex-end;
        align-self: flex-end;
        justify-content: flex-end;
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
                {list.map((num) =>
                    <LecturerBox key={num}>
                        <LecturerPhoto>Slika</LecturerPhoto>
                        <LecturerInfo>
                            Titula
                            <br />
                            Ime Prezime
                            <br />
                            Predaje
                        </LecturerInfo>
                    </LecturerBox>
                )}
            </StyledContainer>
        </StyledPaper>
    );
}

export default StudentHome;
