import React from 'react';
import Link from 'next/link';
import LecturerTicket from '../components/lecturerTicket';
import { StyledPaper, Title, StyledContainer, Ticket } from '../lib/styles/studentHome';
import axios from 'axios';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';

const StudentHome: NextPage = ({ _id, lecturers }: any) => {

    const list: any[] = lecturers;

    const displayLecturers = () => list.length < 1 ?
        <Typography
            gutterBottom
            variant='subtitle1'
            align='center'
        >
            Lista je trenutno prazna.
        </Typography>
        : list.map((lecturer: any, index: number) =>
            <Link
                key={index}
                href={{
                    pathname: '/questionnaire',
                    query: {
                        _id,
                        lecturer,
                        lecturer_id: lecturer._id,
                        groupName: lecturer.groupName
                    }
                }}>
                <Ticket elevation={3}>
                    <LecturerTicket >
                        {lecturer}
                    </LecturerTicket >
                </Ticket>
            </Link>
        )


    return (
        <StyledPaper elevation={3}>
            <Title width={1}>
                Vaši predavači
            </Title>
            <StyledContainer>
                {displayLecturers()}
            </StyledContainer>
        </StyledPaper>
    );
}


StudentHome.getInitialProps = async ({ query: { _id } }: any) => {

    console.log("StudentHome query", _id);

    const route = 'http://localhost:3000/api/students/lecturers';

    const { data: { lecturers, studentMarks } } = await axios.get(route, {
        params: {
            _id
        }
    })
        .then(res => {
            console.log(res)
            return res;
        })
        .catch(err => {
            console.log(err)
            return err;
        });

    const updatedLecturers = studentMarks.map((mark: any) => {
        const lect = lecturers.find((lectuer: any) => lectuer._id === mark._id)
        return Object.assign({}, lect, { groupName: mark.groupName })
    });

    return {
        _id,
        lecturers: updatedLecturers
    };
}

export default StudentHome;
