import { TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { AddStudentsForm } from '../../src/ts/interfaces/studentGroup.interface';
import { useStyles } from "./styles";
import { students } from "../../lib/mocks/students";
import { Student, Person } from "../../src/ts/interfaces/users.interface";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddPersonsForm = ({ currentGroup, add }: AddStudentsForm): JSX.Element => {

    const initial: Student = {
        _id: '',
        email: '',
        role: 'student',
        firstName: '',
        lastName: '',
    };
    const classes = useStyles();

    const submit = (student: Student) => {
        if (currentGroup.length) {
            if (!currentGroup.find((s: Student) => s._id === student._id)) {
                add(student)
            } else return;
        }
        else return;
    };

    return (
        <Formik
            initialValues={initial}
            onSubmit={(student: Student) => submit(student)}
        >
            {({ handleChange }) => (
                <Form>
                    <Autocomplete
                        onChange={(_, m) => add(m ? m : initial)}
                        options={students}
                        getOptionLabel={
                            ({ title, firstName, lastName, email }: Person) =>
                                `${title + ` ` + firstName + ` ` + lastName + ` ` + email}`}
                        renderInput={(params: any) =>
                            <TextField
                                {...params}
                                onChange={handleChange}
                                className={classes.input}
                                type="text"
                                label="Pretraga"
                                color='secondary'
                                variant='outlined'
                            />
                        }
                    />
                    <Button
                        className={classes.addGroupButton}
                        type={'submit'}
                        variant="outlined"
                        color='secondary'
                    >
                        Dodaj
                    </Button>
                </Form>
            )}
        </Formik>
    )
};

export default AddPersonsForm;