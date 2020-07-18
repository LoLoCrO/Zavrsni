import React from 'react';
import { LecturerBox, LecturerInfo } from './styles';

const LecturerTicket: React.FunctionComponent =
    ({ children: { title, firstName, lastName, groupName } }: any): JSX.Element =>
        <LecturerBox>
            <LecturerInfo>
                {title}
                <br />
                {firstName + ` ` + lastName}
                <br />
                {groupName}
            </LecturerInfo>
        </LecturerBox>;

export default LecturerTicket;
