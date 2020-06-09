import { TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { AddStudentsForm } from '../../src/ts/interfaces/studentGroup.interface';
import { useStyles } from "./styles";
import { students } from "../../lib/mocks/students";
import { Student, Person } from "../../src/ts/interfaces/users.interface";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddPersonsForm = ({ currentGroup, add }: AddStudentsForm): JSX.Element => {

    const classes = useStyles();

    const initial: Student = {
        _id: '',
        email: '',
        role: 'student',
        firstName: '',
        lastName: '',
    };

    const filtered = students.filter((s: Student) => !currentGroup.includes(s));

    return (
        <Formik
            initialValues={initial}
            onSubmit={(student: Student) => add(student)}
        >
            {({ handleChange }) => (
                <Form>
                    <Autocomplete
                        onChange={(_, m) => add(m ? m : initial)}
                        options={filtered}
                        getOptionLabel={
                            ({ title, firstName, lastName, email }: Person) =>
                                `${title + ` ` + firstName + ` ` + lastName + ` ` + email}`}
                        renderInput={(params: any) =>
                            <TextField
                                {...params}
                                onChange={handleChange}
                                className={classes.input}
                                type="text"
                                label="Studenti"
                                color='secondary'
                                variant='outlined'
                            />
                        }
                    />
                    <Button
                        className={classes.saveGroupButton}
                        variant="outlined"
                        color='primary'
                    >
                        Pohrani
                    </Button>
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