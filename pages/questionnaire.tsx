import React from 'react';
import Questionnarie from '../components/questionnaire';
import axios from 'axios';
import Router from 'next/router';

interface FormData {

}

const QPage: React.StatelessComponent = (): JSX.Element => {
    const app = `http://localhost:3000`;

    const onSubmit = async (fromData: FormData) =>
        await axios({
            method: 'post',
            url: `${app}/api/professors`,
            data: fromData
        })
            .then((res) => Router.push('/studentHome'))
            .catch((err) => {
                if (err) {
                    alert('Došlo je do pogreške, molimo Vas pokušajte kasnije.');
                }
                Router.push('/studentHome');
                console.log(err);
            });

    return (<Questionnarie onSubmit={(v: any) => console.log(onSubmit(v))} />);
}
export default QPage;