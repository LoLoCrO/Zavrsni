import React from 'react';
import { LecturerBox, LecturerPhoto, LecturerInfo } from './styles';


const LecturerTicket: React.FunctionComponent = (): JSX.Element =>
    <LecturerBox>
        {/* <LecturerPhoto>Slika</LecturerPhoto> */}
        <LecturerInfo>
            Titula
            <br />
            Ime Prezime
            <br />
            Predaje
        </LecturerInfo>
    </LecturerBox>;

export default LecturerTicket;
