import React from 'react';
import Questionnarie from '../components/questionnaire';
import { DrawerBox, Sticky } from '../lib/styles/professorProfile';
import Drawer from '../components/drawer';
import axios from 'axios';
import Router from 'next/router';
import { NextPage } from 'next';

const QPage: NextPage = ({ _id, lecturer_id, groupName, studentMarks }: any): JSX.Element => { //{ _id, lecturer_id, groupName, studentMarks }

    if (process.browser) {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token && Router || role !== 'student') { Router.push('/login') };
    }

    console.log("Questionnaire", { _id, lecturer_id, groupName, studentMarks });
    console.log('JSON.parse(studentMarks)', JSON.parse(studentMarks))
    const app = `http://localhost:3000`;

    const studentHome = {
        pathname: '/studentHome',
        query: {
            _id
        },
    };

    const onSubmit = async (formData: Object) => {

        console.log(formData, Object.values(formData)
            .splice(0, Object.keys(formData).length - 1)
            .filter((value: string) => value === ''));

        if (
            Object.values(formData)
                .splice(0, Object.keys(formData).length - 1)
                .filter((value: string) => value === '')
                .length
        ) {
            alert("Sva pitanja su obavezna!");
            return formData;
        }

        const updatedMarks = JSON.parse(studentMarks).map(
            (mark: any) =>
                mark.groupName === groupName
                    ? Object.assign({}, mark, { marked: true })
                    : mark
        );
        console.log("updatedMarks", updatedMarks);
        const grade = Object.values(formData)
            .splice(0, Object.keys(formData).length - 1)
            .map((mark: string) => parseInt(mark));

        const comment = Object.values(formData).pop();

        await axios.post(`${app}/api/professors/questionnaire`,
            {
                _id: lecturer_id,
                student_id: _id,
                grade,
                comment,
                updatedMarks
            }
        )
            .then((res) => {
                console.log(res.data)
                if (!res.data.success) {
                    alert('Došlo je do pogreške, molimo Vas pokušajte kasnije.');
                }
                Router.push(studentHome)
            })
            .catch((err) => {
                if (err) {
                    alert('Došlo je do pogreške, molimo Vas pokušajte kasnije.');
                }

                console.log(err);
                Router.push(studentHome);
            });

        return formData;
    }

    return (
        <React.Fragment>
            <DrawerBox>
                <Sticky>
                    <Drawer type='student' />
                </Sticky>
            </DrawerBox>
            <Questionnarie
                onSubmit={(value: any) => onSubmit(value)}
            />
        </React.Fragment>
    );
}

QPage.getInitialProps = ({ query: { _id, lecturer_id, groupName, studentMarks } }: any) => ({
    _id,
    lecturer_id,
    groupName,
    studentMarks
})

export default QPage;