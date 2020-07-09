import React from 'react';
import { DrawerBox, StyledPaper, useStyles } from '../lib/styles/addGroups';
import Drawer from '../components/drawer';
import { Grid, Paper } from '@material-ui/core';
import GroupModal from '../components/groupModal';
import GroupMenu from '../components/groupMenu';
import { StudentGroup } from '../src/ts/interfaces/studentGroup.interface';
import AddGroupTabs from '../components/addGroupTabs';
import axios from 'axios';
import { NextPage } from 'next';

const AddGroups: NextPage = ({ fetchedGroups }: any): JSX.Element => {
    const classes = useStyles();

    const [open, setOpen] = React.useState<boolean>(false);
    const [search, setToSearch] = React.useState<boolean>(false);
    const [groupName, setGroupName] = React.useState<StudentGroup | null>(null);
    const [groups, setGroups] = React.useState<StudentGroup[]>(fetchedGroups);
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
        if (!_id && groups.find(group => group.name === name)) {
            alert("Ime vec postoji!");
            return;
        }
        await axios({
            method: 'post',
            url: `/api/groups/${_id ? 'update' : 'new'}`,
            data: {
                ...(_id ? { _id } : {}),
                name
            }
        }).then((res) => {
            if (!res.data.success) {
                return alert('Doslo je do pogreske!');
            }
            const { group } = res.data;
            delete group['__v'];
            console.log(group)
            const newGroups: StudentGroup[] = Object.assign([], [
                group,
                ...groups.filter((g: StudentGroup) => g.name.length < 1 || g._id !== group._id)
            ]);
            return setGroups(newGroups);
        })
            .catch((err) => {
                console.log(err);
                return alert('Doslo je do pogreske!');
            });
        setGroupName(null);
        handleClose();
    };

    const removeGroup = async (id: string) => {
        if (!id) {
            alert("Doslo je do pogreske!");
            return;
        }
        await axios({
            method: 'delete',
            url: `/api/groups`,
            data: {
                _id: id
            }
        }).then((res) => {
            if (!res.data.success) {
                return alert('Doslo je do pogreske!');
            }
            setGroups(Object.assign([], groups)
                .filter(({ _id }: StudentGroup) => _id !== id))
        }).catch((err) => {
            console.log(err);
            return alert('Doslo je do pogreske!');
        });
    };

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

AddGroups.getInitialProps = async () => {

    const res = await axios.get('http://localhost:3000/api/groups/all')
        .then(res => res)
        .catch(err => {
            console.log(err)
            return err;
        });

    return {
        fetchedGroups: res.data.map((group: any) => {
            delete group['__v'];
            return group;
        })
    }
}

export default AddGroups;
