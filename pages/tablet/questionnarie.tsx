import React from 'react';
import Questionnarie from '../../components/questionnaire';

const QPage: React.FunctionComponent = (): JSX.Element => <Questionnarie onSubmit={(v: any) => console.log(v)} />

export default QPage;