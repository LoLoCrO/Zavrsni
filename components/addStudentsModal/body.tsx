import { Typography, TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { StudentGroup } from "../../pages/addStudents";
import { useStyles } from './styles';

interface Props {
    groupName: StudentGroup | null;
    handleClose: () => void;
    addOrEditGroup: ({ _id, name }: StudentGroup) => void;
}

const Body = ({ handleClose, groupName, addOrEditGroup }: Props): JSX.Element => {

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