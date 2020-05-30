import React from 'react';
import { Formik } from 'formik';
import { StyledTextField, StyledPaper, StyledTypography, StyledForm, StyledButton } from './styles';
import { LoginFormProps, LoginValues, TextFieldsProps } from '../../src/ts/interfaces/login.interface';


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