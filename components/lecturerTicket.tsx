import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const LecturerBox = styled(Container)`
    && {
        padding: 1rem;
        display: table-cell;
        height: 7rem;
        width: auto;
    }
`;

const LecturerPhoto = styled.div`
    && {
        vertical-align: top;
        padding: 1rem;
        height: 5rem;
        width: auto;
        background-color: red;
        display: table-cell;
        vertical-align: top;
    }
`;

const LecturerInfo = styled.div`
    && {
        vertical-align: bottom;
        text-align: end;
        padding: 1rem;
        height: 5rem;
        width: 24rem;
        background-color: blue;
        display: table-cell;
    }
`;

const LecturerTicket: React.FunctionComponent = (): JSX.Element => {

    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return <LecturerBox>
        <LecturerPhoto>Hello1</LecturerPhoto>
        <LecturerInfo>Hello1</LecturerInfo>
    </LecturerBox>;
}

export default LecturerTicket;
