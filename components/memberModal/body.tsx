import { Typography, TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useStyles } from './styles';
import { MemberModalBody } from "../../src/ts/interfaces/member.interface";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { professors } from "../../lib/mocks/professors";
import { Professor } from "../../src/ts/interfaces/users.interface";

const Body = ({ handleClose, member: { _id, role, email }, edit }: MemberModalBody): JSX.Element => {

    const classes = useStyles();

    return (
        <div
            className={classes.paper}
        >
            <Typography
                variant='h5'
                className={classes.title}
            >
                Promijeni predavaca:
            </Typography>
            <Formik
                initialValues={professors[5]}
                onSubmit={(res) => { //{ _id, email }
                    console.log(res)
                    // edit({ _id, email, role })
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Autocomplete
                            id="combo-box"
                            options={professors}
                            getOptionLabel={
                                ({ title, firstName, lastName, email }: Professor) =>
                                    `${title + ` ` + firstName + ` ` + lastName + ` ` + email}`}
                            renderInput={(params: any) =>
                                <TextField
                                    {...params}
                                    onClick={() => console.log(params)}
                                    onChange={handleChange}
                                    className={classes.input}
                                    type="text"
                                    label="Pretraga"
                                    color='secondary'
                                    variant='outlined'
                                    placeholder={values.email}
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