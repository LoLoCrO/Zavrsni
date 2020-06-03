import { Typography, TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useStyles } from './styles';
import { IBody } from '../../src/ts/interfaces/studentGroup.interface';

const Body = ({ handleClose, groupName, addOrEditGroup }: IBody): JSX.Element => {

    const classes = useStyles();

    return (
        <div
            className={classes.paper}
        >
            <Typography
                variant='h5'
                className={classes.title}
            >
                Ime grupe:
            </Typography>
            <Formik
                initialValues={groupName ? groupName : { _id: '', name: '' }}
                onSubmit={(groupName) => addOrEditGroup(groupName)}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            id='name'
                            value={values.name}
                            onChange={handleChange}
                            className={classes.input}
                            label="Ime grupe"
                            placeholder={groupName?.name}
                            type="text"
                            color='secondary'
                            variant="outlined"
                            inputProps={{
                                maxLength: 30,
                            }} />
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