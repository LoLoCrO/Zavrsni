import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import {
    Button,
    Paper,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';

interface QuestionnaireFormProps {
    values: any;
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ?
            void : (e: string | React.ChangeEvent<any>) => void;
    }
}

interface QuestionnaireProps {
    onSubmit: (values: any) => void;
}

const StyledPaper = styled(Paper)`
    && {
        margin: auto;
        margin-top: 5rem;
        margin-bottom: 5rem;
        padding: 1%;
        width: 80vw;
        height: auto;
    }     
`;

const StyledTypography = styled(Typography)`
    && {
        margin: 2%;
        margin-bottom: 0;
        color: #424242;
        font-size: 22;
        text-align: center;
    }
`;

const StyledButton = styled(Button)`
    && {
        margin: auto;
        margin-top: 2vh;
        margin-bottom: 2vh;
        display: flex;
        width: 5rem;
        background-color: #424242;
        text-transform: none;
        justify-content: center;
    }
`;

const StyledRadioGroup = styled(RadioGroup)`
    && {
        flex-direction: row;
        justify-content: center;
    }
`;

const StyledRadio = styled(Radio)`
    && {
        display: inline-block;
    }
`;

const Questionnaire = ({ onSubmit }: QuestionnaireProps): JSX.Element => {


    const questions: string[] = [
        'Ocjenite vlastitu sposobnost za zadovoljite zahtjeve ovog kolegija.',
        'Nastavnik/suradnik na jasan i razumljiv način upoznao Vas je sa sadržajem i izvedbenim planom predmeta.',
        'Nastavnik/suradnik je jasno utvrdio načine kriterija ocjenjivanja studenta.',
        'Nastava se održava na vrijeme i redovito.',
        'Nastavnik/suradnik razumljivo izlaže nastavne sadržaje.',
        'Nastava se izvodi u skladu s izvedbenim planom.',
        'Nastavni materijali su primjereni i razumljivi.',
        'Nastavnik/suradnik se zalaže što kvalitetnije izložiti nastavno gradivo.',
        'Nastavnik/suradnik potiče studente na aktivnost tijekom nastave.',
        'Nastavnik/suradnik je korektan u komunikaciji sa studentima.'
    ]
    const marks: any = {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': ''
    };

    const markValues: string[] = ['1', '2', '3', '4', '5'];

    const listQuestions = ({ values, handleChange }: QuestionnaireFormProps): JSX.Element[] =>
        Object.keys(values).map((key: any, index: number) =>
            <div key={index}>
                <StyledTypography>
                    {questions[index]}
                </StyledTypography>
                <StyledRadioGroup onChange={handleChange} name={key} value={values[key]}>
                    {markValues.map((mark: string) =>
                        <FormControlLabel
                            key={mark}
                            checked={values[key] === mark}
                            control={<StyledRadio />}
                            value={mark}
                            label={mark}
                        />)}
                </StyledRadioGroup>
            </div>);

    return (
        <StyledPaper elevation={3}>
            <StyledTypography>
                Anketa
            </StyledTypography>
            <Formik
                initialValues={marks}
                onSubmit={(values: any) => onSubmit(values)}
            >
                {({ values, handleChange }) => (
                    <Form>
                        {listQuestions({ values, handleChange })}
                        <StyledButton type={'submit'}>
                            Potvrdi
                        </StyledButton>
                    </Form>
                )}
            </Formik>
        </StyledPaper>
    )
};

export default Questionnaire;