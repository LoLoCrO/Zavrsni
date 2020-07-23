import React from 'react';
import Link from 'next/link';
import LecturerTicket from '../components/lecturerTicket';
import { StyledPaper, Title, StyledContainer, Ticket } from '../lib/styles/studentHome';
import { Typography } from '@material-ui/core';
import { DrawerBox, Sticky } from '../lib/styles/professorProfile';
import Drawer from '../components/drawer';
import Router from 'next/router';
import { NextPage } from 'next';
import axios from 'axios';

const StudentHome: NextPage = ({ _id, lecturers, studentMarks }: any) => {

    if (process.browser) {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token && Router || role !== 'student') { Router.push('/login') };
    }

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
        <React.Fragment>
            <DrawerBox>
                <Sticky>
                    <Drawer type='student' />
                </Sticky>
            </DrawerBox>
            <StyledPaper elevation={3}>
                <Title width={1}>
                    Vaši predavači
                </Title>
                <StyledContainer>
                    {displayLecturers()}
                </StyledContainer>
            </StyledPaper>
        </React.Fragment>
    );
}


StudentHome.getInitialProps = async ({ query: { _id }, res }: any) => {

    const token = localStorage.getItem('token');

    if (!token) {
        if (Router) {
            return Router.push('/login');
        } else res.redirect('/login');
    }

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

    return {
        _id,
        studentMarks: updatedMarks,
        lecturers: updatedLecturers
    };
}

export default StudentHome;
