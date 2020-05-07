import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const LecturerBox = styled(Container)`
    && {
        min-height: 6rem;
        padding: 1vw;
        width: auto;
        display: flex;
        justify-content: space-between;
    }
`;

const LecturerPhoto = styled.div`
    && {
        height: 5vh;
        align-self: flex-start;

    }
`;

const LecturerInfo = styled.div`
    && {
        display: flex;
        text-align: end;
        height: 4rem;
        overflow: hidden;
        white-space: nowrap;
        align-items: flex-end;
        align-self: flex-end;
    }
`;

const LecturerTicket: React.FunctionComponent = (): JSX.Element => {

    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return <LecturerBox>
        <LecturerPhoto>Slika</LecturerPhoto>
        <LecturerInfo>
            Titula
            <br/>
            Ime Prezime
            <br/>
            Predaje
        </LecturerInfo>
    </LecturerBox>;
}

export default LecturerTicket;
