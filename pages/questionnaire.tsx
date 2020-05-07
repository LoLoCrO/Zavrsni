import React from 'react';
import Questionnarie from '../components/questionnaire';

const QPage: React.StatelessComponent = (): JSX.Element =>
    <Questionnarie onSubmit={(v: any) => console.log(v)} />

export default QPage;