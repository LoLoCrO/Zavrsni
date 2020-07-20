import React from 'react';
import Link from 'next/link';
import LecturerTicket from '../components/lecturerTicket';
import { StyledPaper, Title, StyledContainer, Ticket } from '../lib/styles/studentHome';
import axios from 'axios';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';

const StudentHome: NextPage = ({ _id, lecturers, studentMarks }: any) => {

    const list: any[] = lecturers;

    const displayLecturers = () => list.length < 1 ?
        <Typography
            gutterBottom
            variant='subtitle1'
            align='center'
        >
            Lista je trenutno prazna.
        </Typography>
        : list.map((lecturer: any, index: number) => {
            console.log(lecturer)
            return (<Link
                key={index}
                href={{
                    pathname: '/questionnaire',
                    query: {
                        _id,
                        studentMarks: JSON.stringify(studentMarks),
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
        })


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

    const updatedMarks = studentMarks.filter((element: any) => !element.marked);
    const updatedLecturers = updatedMarks.map((mark: any) => {
        const lect = lecturers.find((lectuer: any) => lectuer._id === mark._id)
        return Object.assign({}, lect, { groupName: mark.groupName })
    });

    // {
    //     console.log("element", element, element.marked, `Condition element.marked ${element.marked}`);
    //     if (element.marked) {
    //         return null;
    //     } else { return element }
    // }

    console.log('studentMarks', updatedMarks)
    return {
        _id,
        studentMarks: updatedMarks,
        lecturers: updatedLecturers
    };
}

export default StudentHome;
