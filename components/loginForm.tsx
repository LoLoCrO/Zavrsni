import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Button, TextField, Paper, Typography } from '@material-ui/core';

export interface LoginValues {
    email: string;
    password: string;
}

interface TextFieldsProps {
    values: LoginValues;
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ?
            void : (e: string | React.ChangeEvent<any>) => void;
    },
    handleBlur: {
        (e: React.FocusEvent<any>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
}

interface LoginFormProps {
    onSubmit: (values: LoginValues) => void;
}

const StyledPaper = styled(Paper)`
    && {
        margin: auto;
        margin-top: 15vh;
        margin-bottom: 15vh;
        padding: 5vw;
        width: 80vw;
        height: auto;

        @media (min-width: 768px) {
            padding-top: 3vw;
            padding-bottom: 3vw;
            width: 40vw;
        }
    }     
`;

const StyledTypography = styled(Typography)`
    && {
        width: 65vw;
        padding-left: 2.5vw;
        margin: 0;
        color: #424242;
        font-size: 22;
        display: block;
        
        @media (min-width: 768px) {
            padding-left: 0;
            width: 30vw;
        }
    }
`;

const StyledForm = styled(Form)`
    && {
        display: flex;
        flex-direction: column;
    }
`;

const StyledTextField = styled(TextField)`
    && {
        width: 65vw;
        margin: 2.5vw;

        @media (min-width: 768px) {
            width: 30vw;
            margin: 0;
            margin-top: 3vw;
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        color: #424242;
        border: 1px solid #c4c4c4;
        margin-top: 3vh;
        padding: 2vw;
        align-self: center;
        background-color: #ececec;
        text-transform: none;

        @media (min-width: 768px) {
            margin-top: 3vw;
            padding: 1vw;
        }
    }
`;

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ onSubmit }: LoginFormProps): JSX.Element => {

    const initialValues: LoginValues = { email: '', password: '' };

    const listTextFields = ({ values, handleChange, handleBlur }: TextFieldsProps): JSX.Element[] => {

        const vals: string[] = Object.values(values);
        const labels: string[] = ['email', 'lozinka'];

        return Object.assign([], Object.keys(values)).map((name: string, index: number) => (
            <StyledTextField
                key={index}
                variant="outlined"
                name={name}
                value={vals[index]}
                onChange={handleChange}
                onBlur={handleBlur}
                label={labels[index]}
            />
        ));
    }

    return (
        <StyledPaper elevation={3}>
            <StyledTypography>
                Prijavite se u sustav:
            </StyledTypography>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: LoginValues) => onSubmit(values)}
            >
                {({ values, handleChange, handleBlur }) => (
                    <StyledForm>
                        {listTextFields({ values, handleChange, handleBlur })}
                        <StyledButton type={'submit'}>
                            Potvrdi
                        </StyledButton>
                    </StyledForm>
                )}
            </Formik>
        </StyledPaper>
    )
};

export default LoginForm;