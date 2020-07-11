import { Typography, TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useStyles } from './styles';
import { MemberModalBody } from "../../src/ts/interfaces/member.interface";
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { professors } from "../../lib/mocks/professors";
import { Person } from "../../src/ts/interfaces/users.interface";
// import { students } from "../../lib/mocks/students";

const Body = ({ handleClose, member, edit, students, professors }: MemberModalBody): JSX.Element => {

    const classes = useStyles();
    const roleMembers: any = member.role === "professor" ? professors : students;

    return (
        <div
            className={classes.paper}
        >
            <Typography
                variant='h5'
                className={classes.title}
            >
                Promjeni predavaca:
            </Typography>
            <Formik
                initialValues={member}
                onSubmit={(values) => {
                    console.log(`{ _id, email }`, values)
                    edit({
                        _id: values._id,
                        email: values.email,
                        role: member.role
                    })
                }}
            >
                {({ handleChange }) => (
                    <Form>
                        <Autocomplete
                            onChange={(_, m) => edit(m ? m : {
                                _id: member._id,
                                email: member.email,
                                role: member.role,
                                firstName: '',
                                lastName: '',
                            })}
                            options={roleMembers}
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
                            type={'button'}
                            className={classes.cancel}
                            variant="outlined"
                            color='default'
                            onClick={handleClose}
                        >
                            Odustani
                        </Button>
                        <Button
                            type={'submit'}
                            className={classes.confirm}
                            variant="outlined"
                            color='secondary'
                        >
                            Potvrdi
                        </Button>
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default Body;