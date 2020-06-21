import React from 'react';
import { DrawerBox, StyledPaper, useStyles } from '../lib/styles/addGroups';
import Drawer from '../components/drawer';
import { Grid, Paper } from '@material-ui/core';
import GroupModal from '../components/groupModal';
import ShortID from 'shortid';
import GroupMenu from '../components/groupMenu';
import { StudentGroup } from '../src/ts/interfaces/studentGroup.interface';
import AddGroupTabs from '../components/addGroupTabs';
import axios from 'axios';

const AddGroups: React.FunctionComponent = (): JSX.Element => {

    const classes = useStyles();

    const [open, setOpen] = React.useState<boolean>(false);
    const [search, setToSearch] = React.useState<boolean>(false);
    const [groupName, setGroupName] = React.useState<StudentGroup | null>(null);
    const [groups, setGroups] = React.useState<StudentGroup[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>('');

    const handleClose = () => setOpen(false);

    const openModal = (id?: string) => {
        if (id) {
            setGroupName(groups.find((group: StudentGroup) => group._id === id) || null);
        } else {
            setGroupName(null);
        };
        setOpen(true)
    }

    const addOrEditGroup = async ({ _id, name }: StudentGroup) => {
        await axios({
            method: 'post',
            url: '/api/groups',
            data: {
                _id,
                name
            }
        }).then((data) => console.log(data))
            .catch((err) => console.log(err));
        // if (_id.length) {
        //     const newGroups: StudentGroup[] = Object.assign([], groups);
        //     newGroups.forEach((group: StudentGroup) => {
        //         if (group._id === _id) {
        //             group.name = name;
        //         }
        //     });
        // } else {
        //     setGroups([{ _id: ShortID.generate(), name }, ...groups]);
        // };
        setGroupName(null);
        handleClose();
    };

    const removeGroup = (id: string) =>
        setGroups(Object.assign([], groups)
            .filter(({ _id }: StudentGroup) => _id !== id));

    const FormRow = (studentGroups: StudentGroup[]) =>
        studentGroups.map((group: StudentGroup, index: number) =>
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

    const filterByValue = (): JSX.Element[] => searchValue.length ?
        FormRow(
            groups.filter(group =>
                Object.keys(group)
                    .some(() =>
                        group.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    )
            )
        ) : FormRow(groups);

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
                <AddGroupTabs
                    setToSearch={setToSearch}
                    groupName={groupName}
                    groups={groups}
                    addOrEditGroup={addOrEditGroup}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Grid container spacing={1}>
                    {search ? filterByValue() : FormRow(groups)}
                </Grid>
            </StyledPaper>
        </React.Fragment>
    );
}

export default AddGroups;
