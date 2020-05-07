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
        padding-top: 2vw;
        padding-bottom: 2vw;
        width: 80vw;
        height: auto;
    }     
`;

const StyledTypography = styled(Typography)`
    && {
        padding: 3vw;
        color: #424242;
        font-size: 22;
        text-align: center;
    }
`;

const StyledForm = styled(Form)`
    && {
        display: flex;
        flex-direction: column;
    }
`;

const StyledRadioGroup = styled(RadioGroup)`
    && {
        padding-left: 3vw;
        padding-left: 3vw;
        flex-direction: row;
        justify-content: center;
    }
`;

const StyledRadio = styled(Radio)`
    && {
        width: 10vw;
        display: inline-block;

        @media (min-width: 768px) {
            width: 5vw;
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        color: #424242;
        border: 1px solid #c4c4c4;
        margin: 5vw;
        align-self: center;
        background-color: #ececec;
        text-transform: none;
        
        @media (min-width: 768px) {
            padding: 1vw;
        }
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
                    <StyledForm>
                        {listQuestions({ values, handleChange })}
                        <StyledButton type={'submit'}>
                            Potvrdi
                        </StyledButton>
                    </StyledForm>
                )}
            </Formik>
        </StyledPaper>
    )
};

export default Questionnaire;