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
       margin-left: auto;
        margin-right: auto;
        width: 30rem;
        height: 30rem;
    }     
`;

const StyledTypography = styled(Typography)`
    && {
        margin: 2.5rem;
        margin-bottom: 0;
        color: #424242;
        font-size: 22;
        float: left;
        clear: left;
    }
`;

const StyledTextField = styled(TextField)`
    && {
        width: 25rem;
        margin: 2.5rem;
    }
`;

const StyledButton = styled(Button)`
  && {
        margin-top: 2.5rem;
        margin-left: 12.5rem;
        margin-right: 12.5rem;
        width: 5rem;
        background-color: #424242;
        text-transform: none;
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
                    <Form>
                        {listTextFields({ values, handleChange, handleBlur })}
                        <StyledButton type={'submit'}>
                            Potvrdi
                        </StyledButton>
                    </Form>
                )}
            </Formik>
        </StyledPaper>
    )
};

export default LoginForm;