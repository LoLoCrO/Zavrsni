import React from 'react';
import Questionnarie from '../components/questionnaire';
import axios from 'axios';
import Router from 'next/router';
import { NextPage } from 'next';

const QPage: NextPage = ({ _id, lecturer_id, groupName, lecturer }: any): JSX.Element => {

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
                groupName,
                lecturer
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

    return (<Questionnarie onSubmit={(value: any) => onSubmit(value)} />);
}

QPage.getInitialProps = ({ query: { _id, lecturer_id } }: any) => ({
    _id,
    lecturer_id
})

export default QPage;