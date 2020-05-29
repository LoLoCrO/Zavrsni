import React from 'react';
import { Formik } from 'formik';
import { Professor, IEditProfessor } from '../../src/ts/interfaces/professor.interface';
import { StyledForm, StyledTextField, StyledButton } from './styles';

const EditProfessor = ({ professor, setProfessor }: IEditProfessor): JSX.Element =>
    <Formik
        initialValues={professor}
        onSubmit={(values: Professor) => setProfessor(values)}
    >
        {({ values, handleChange }) => (
            <StyledForm>
                <StyledTextField
                    value={values.firstName}
                    onChange={handleChange}
                    id="firstName"
                    label="Ime"
                    color='secondary'
                    placeholder={values.firstName}
                />
                <StyledTextField
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder={values.lastName}
                    id="lastName"
                    label="Prezime"
                    color='secondary'
                />
                <StyledTextField
                    value={values.email}
                    onChange={handleChange}
                    placeholder={values.email}
                    id="email"
                    label="Email"
                    color='secondary'
                />
                <StyledButton
                    color='secondary'
                    type={'submit'}
                >
                    Potvrdi
                    </StyledButton>
            </StyledForm>
        )}
    </Formik>;

export default EditProfessor;