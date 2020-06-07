import React from 'react';
import { DrawerBox, StyledPaper, useStyles } from '../lib/styles/addGroups';
import Drawer from '../components/drawer';
import { Grid, Paper } from '@material-ui/core';
import ShortID from 'shortid';
import MemberModal from '../components/memberModal';
import AddGroupTabs from '../components/addGroupTabs';
import { professors } from '../lib/mocks/professors';
import { Student } from '../src/ts/interfaces/users.interface';
import { Member } from '../src/ts/interfaces/member.interface';
import MemberMenu from '../components/memberMenu';
import { Professor } from '../src/ts/interfaces/users.interface';

const AddStudentsAndProfessors: React.FunctionComponent = (): JSX.Element => {

    const classes = useStyles();

    const initialMember: Member = { _id: '', role: 'none', email: '' };

    const [lecturer, setLecturer] = React.useState<Professor>(professors[0]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [search, setToSearch] = React.useState<boolean>(false);
    const [member, setMember] = React.useState<Member>(initialMember);
    const [students, setStudents] = React.useState<Student[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>('');

    React.useEffect(() => console.log(students), [students])

    const handleClose = () => setOpen(false);

    const openModal = ({ _id, role, email }: Member) => {
        setMember({ _id, role, email });
        setOpen(true)
    }

    const edit = ({ _id, role, email }: Member) => {
        if (role === 'student') {
            const newStudents: Student[] = Object.assign([], students);
            newStudents.forEach((student: Student) => {
                if (student._id === _id) {
                    student.email = email;
                }
            });
            setStudents(newStudents);
        } else {
            setLecturer(Object.assign({}, { ...lecturer, email }));
        }
        setMember(initialMember);
        setOpen(false);
    };

    const remove = (id: string) =>
        setStudents(Object.assign([], students)
            .filter(({ _id }: Student) => _id !== id));

    const FormRow = (students: Student[]) =>
        students.map((
            {
                _id,
                firstName,
                middleName,
                lastName,
                title,
                email,
            }: Student,
            index: number) =>
            <Grid
                item
                key={index}
            >
                <Paper
                    className={classes.paper}
                >
                    {title ? <br>{title}</br> : null}
                    <br>
                        {firstName + middleName ? ` ${middleName} ` : ` ` + lastName}
                    </br>
                    {email}
                    <br />
                    {MemberMenu({ member: { _id, role: 'student', email }, openModal, remove })}
                </Paper>
            </Grid>
        );

    const filterByValue = (): JSX.Element[] => searchValue.length ?
        FormRow(
            students.filter((student: Student) =>
                Object.keys(student)
                    .some(() =>
                        student
                            .email
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    )
            )
        ) : FormRow(students);

    return (
        <React.Fragment>
            <MemberModal
                open={open}
                member={member}
                handleClose={handleClose}
                edit={edit}
            />
            <DrawerBox>
                <Drawer />
            </DrawerBox>
            <StyledPaper elevation={3}>
                <AddGroupTabs
                    setToSearch={setToSearch}
                    member={member}
                    groups={students}
                    editGroup={edit}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Paper
                    className={classes.paper}
                >
                    {
                        `${lecturer.title ? `${lecturer.title} ` : ` `}` +
                        lecturer.firstName + ` ` +
                        `${lecturer.middleName ? ` ${lecturer.middleName} ` : ` `}` +
                        lecturer.lastName
                    }
                    <br />
                    {lecturer.email}
                    {MemberMenu({ member, openModal, remove })}
                </Paper>
                <Grid container spacing={1}>
                    {search ? filterByValue() : FormRow(students)}
                </Grid>
            </StyledPaper>
        </React.Fragment >
    );
}

export default AddStudentsAndProfessors;
