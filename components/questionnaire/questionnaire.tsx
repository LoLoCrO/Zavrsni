import React from 'react';
import { Formik } from 'formik';
import { FormControlLabel } from '@material-ui/core';
import {
    QuestionnaireFormProps,
    QuestionnaireProps
} from '../../src/ts/interfaces/questionnaire.interface';
import {
    StyledTypography,
    StyledRadioGroup,
    StyledRadio,
    StyledPaper,
    StyledForm,
    StyledTextField,
    StyledButton
} from './styles';
import {
    questions,
    markValues,
    initValues
} from '../../lib/mocks/questionnaire';

const Questionnaire = ({ onSubmit }: QuestionnaireProps): JSX.Element => {

    const listQuestions = ({ values, handleChange }: QuestionnaireFormProps): JSX.Element[] =>
        Object
            .keys(values)
            .filter((val: string) => val !== 'comment')
            .map((key: string, index: number) =>
                <div key={index}>
                    <StyledTypography>
                        {questions[index]}
                    </StyledTypography>
                    <StyledRadioGroup
                        onChange={handleChange}
                        name={key}
                        value={values[key]}
                    >
                        {markValues.map((mark: string) =>
                            <FormControlLabel
                                key={mark}
                                checked={values[key] === mark}
                                control={<StyledRadio />}
                                value={mark}
                                label={mark}
                            />
                        )}
                    </StyledRadioGroup>
                </div>
            );

    return (
        <StyledPaper elevation={3}>
            <StyledTypography>
                Anketa
            </StyledTypography>
            <Formik
                initialValues={initValues}
                onSubmit={(values: any) => onSubmit(values)}
            >
                {({ values, handleChange }) => (
                    <StyledForm>
                        {listQuestions({ values, handleChange })}
                        <StyledTextField
                            value={values.comment}
                            onChange={handleChange}
                            id="comment"
                            label="Komentar"
                            placeholder="Komentar"
                            multiline
                            variant="outlined"
                        />
                        <StyledButton
                            type={'submit'}
                        >
                            Potvrdi
                        </StyledButton>
                    </StyledForm>
                )}
            </Formik>
        </StyledPaper>
    )
};

export default Questionnaire;