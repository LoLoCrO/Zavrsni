import React from 'react';
import Link from 'next/link';
import LecturerTicket from '../components/lecturerTicket';
import { StyledPaper, Title, StyledContainer, Ticket } from '../lib/styles/studentHome';
import axios from 'axios';
import { NextPage } from 'next';

const StudentHome: NextPage = (props: any) => {
    console.log('StudentHomeProps', props);
    const list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <StyledPaper elevation={3}>
            <Title width={1}>
                Vaši predavači
            </Title>
            <StyledContainer>
                {list.map((num: number) =>
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
                )}
            </StyledContainer>
        </StyledPaper>
    );
}


StudentHome.getInitialProps = async ({ query }: any) => {

    console.log("StudentHome query", JSON.parse(query.user));

    const { _id } = await JSON.parse(query.user);

    const res = await axios.get('http://localhost:3000/api/students/lecturers', {
        params: {
            _id
        }
    });
    // const lecturers = res;
    console.log('axios lecturers', res)
    return {
        props: {

        },
    }
}

export default StudentHome;
