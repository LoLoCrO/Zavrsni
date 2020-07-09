import React from 'react';
import Link from 'next/link';
import LecturerTicket from '../components/lecturerTicket';
import { StyledPaper, Title, StyledContainer, Ticket } from '../lib/styles/studentHome';
import axios from 'axios';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';

const StudentHome: NextPage = (context: any) => {
    console.log('student', context);

    const list: any[] = context.professorMarks;

    const displayLecturers = () => list.length < 1 ?
        <Typography
            gutterBottom
            variant='subtitle1'
            align='center'
        >
            Lista je trenutno prazna.
        </Typography>
        : list.map((num: number) =>
            <Link
                key={num}
                href={{
                    pathname: '/questionnaire',
                    // query: { object: JSON.stringify(object) }
                }}>
                <Ticket elevation={3}>
                    <LecturerTicket>
                        {num}
                    </LecturerTicket>
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


StudentHome.getInitialProps = async ({ query }: any) => {

    console.log("StudentHome query", query);

    const { _id } = await JSON.parse(query.user);

    const res = await axios.get('http://localhost:3000/api/students/lecturers', {
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

    console.log('axios lecturers', res.data)

    return res.data;
}

export default StudentHome;
