import React from 'react';
import { DrawerBox, StyledPaper, useStyles } from '../lib/styles/addGroups';
import Drawer from '../components/drawer';
import { Grid, Paper, Button } from '@material-ui/core';
import GroupModal from '../components/groupModal';
import ShortID from 'shortid';
import GroupMenu from '../components/groupMenu';
import { StudentGroup } from '../src/ts/interfaces/studentGroup.interface';

const AddGroups: React.FunctionComponent = (): JSX.Element => {

    const classes = useStyles();

    const [open, setOpen] = React.useState<boolean>(false);
    const [groupName, setGroupName] = React.useState<StudentGroup | null>(null);
    const [groups, setGroups] = React.useState<StudentGroup[]>([]);

    const handleClose = () => setOpen(false);

    const openModal = (id?: string) => {
        if (id) {
            setGroupName(groups.find((group: StudentGroup) => group._id === id) || null);
        } else {
            setGroupName(null);
        };
        setOpen(true)
    }

    const addOrEditGroup = ({ _id, name }: StudentGroup) => {
        console.log({ _id, name });
        console.log(groups);
        // update db instertOne(), if seed is successful then do this
        if (_id.length) {
            const newGroups: StudentGroup[] = Object.assign([], groups);
            newGroups.forEach((group: StudentGroup) => {
                if (group._id === _id) {
                    group.name = name;
                }
            });
        } else {
            setGroups([...groups, { _id: ShortID.generate(), name }]);
        };
        setGroupName(null);
        handleClose();
    };

    const removeGroup = (id: string) =>
        setGroups(Object.assign([], groups)
            .filter(({ _id }: StudentGroup) => _id !== id));

    const FormRow = () =>
        groups.map((group: StudentGroup, index: number) =>
            <Grid
                item
                key={index}
            >
                <Paper
                    className={classes.paper}
                >
                    {group.name}
                    {GroupMenu({ group, openModal, removeGroup })}
                </Paper>
            </Grid>
        );

    return (
        <React.Fragment>
            <GroupModal
                open={open}
                groupName={groupName}
                handleClose={handleClose}
                addOrEditGroup={addOrEditGroup}
            />
            <DrawerBox>
                <Drawer />
            </DrawerBox>
            <StyledPaper elevation={3}>
                <Button
                    className={classes.addGroupButton}
                    variant="outlined"
                    color='secondary'
                    onClick={() => openModal()}
                >
                    Dodaj novu Grupu
                </Button>
                <Grid container spacing={1}>
                    {FormRow()}
                </Grid>
            </StyledPaper>
        </React.Fragment>
    );
}

export default AddGroups;
