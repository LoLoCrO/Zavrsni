import React from 'react';
import Questionnarie from '../components/questionnaire';
import axios from 'axios';
import Router from 'next/router';
import { NextPage } from 'next';

const QPage: NextPage = ({ _id, lecturer_id }: any): JSX.Element => {

    const app = `http://localhost:3000`;

    const studentHome = {
        pathname: '/studentHome',
        query: {
            _id
        },
    };

    const onSubmit = async (fromData: any) =>
        await axios.put(`${app}/api/professors/questionnaire`,
            {
                _id: lecturer_id,
                fromData
            }
        )
            .then((res) => {
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

    return (<Questionnarie onSubmit={(v: any) => console.log(onSubmit(v))} />);
}

QPage.getInitialProps = ({ query: { _id, lecturer_id } }: any) => ({
    _id,
    lecturer_id
})

export default QPage;