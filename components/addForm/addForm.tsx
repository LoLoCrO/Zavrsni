import { TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { IAddForm, StudentGroup } from '../../src/ts/interfaces/studentGroup.interface';
import { useStyles } from "./styles";

const AddForm = ({ groupName, groups, addOrEditGroup }: IAddForm): JSX.Element => {

    const classes = useStyles();

    const submit = (group: StudentGroup) => {
        if (group.name.length) {
            if (!groups.find((g: StudentGroup) => g.name === group.name)) {
                addOrEditGroup(group)
            } else return;
        }
        else return;
    };

    return (
        <Formik
            initialValues={groupName ? groupName : { _id: '', name: '' }}
            onSubmit={(group: StudentGroup) => submit(group)}
        >
            {({ values, handleChange }) => (
                <Form>
                    <TextField
                        className={classes.input}
                        id='name'
                        value={values.name}
                        onChange={handleChange}
                        label="Ime grupe"
                        type="text"
                        color='secondary'
                        variant="outlined"
                        inputProps={{
                            maxLength: 30,
                        }} />
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

export default AddForm;