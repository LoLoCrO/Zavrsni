import React from 'react';
import { DrawerBox, StyledPaper, useStyles } from '../lib/styles/addGroups';
import Drawer from '../components/drawer';
import { Grid, Paper } from '@material-ui/core';
import MemberModal from '../components/memberModal';
import { professors } from '../lib/mocks/professors';
import { Student } from '../src/ts/interfaces/users.interface';
import { Member } from '../src/ts/interfaces/member.interface';
import MemberMenu from '../components/memberMenu';
import { Professor } from '../src/ts/interfaces/users.interface';
import AddPersons from '../components/addPersons';

const AddStudentsAndProfessors: React.FunctionComponent = (): JSX.Element => {

    const classes = useStyles();

    const initialMember: Member = { _id: '', role: 'none', email: '' };

    const [lecturer, setLecturer] = React.useState<Professor>(professors[0]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [search, setToSearch] = React.useState<boolean>(false);
    const [member, setMember] = React.useState<Member>(initialMember);
    const [currentGroup, setCurrentGroup] = React.useState<Student[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>('');

    React.useEffect(() => console.log(currentGroup), [currentGroup])

    const handleClose = () => setOpen(false);

    const openModal = ({ _id, role, email }: Member) => {
        setMember({ _id, role, email });
        setOpen(true)
    }

    const edit = ({ _id, role, email }: Member) => {
        if (role === 'student') {
            const newStudents: Student[] = Object.assign([], currentGroup);
            newStudents.forEach((student: Student) => {
                if (student._id === _id) {
                    student.email = email;
                }
            });
            setCurrentGroup(newStudents);
        } else {
            const newLecturer = professors.find((professor: Professor) => professor._id === _id);
            if (newLecturer) {
                console.log('Dodajem: ', newLecturer);
                setLecturer(newLecturer);
            }
        }
        setMember(initialMember);
        setOpen(false);
    };

    const add = (student: Student) => {
        if (student) {
            console.log("ADD: ", student);
            const newStudents: Student[] = Object.assign([], currentGroup);
            newStudents.push(student);
            setCurrentGroup(newStudents);
            setOpen(false);
        }
    };

    const remove = (id: string) =>
        setCurrentGroup(Object.assign([], currentGroup)
            .filter(({ _id }: Student) => _id !== id));

    const FormRow = (s: Student[]) => {
        console.log(s);
        return (
            s.map((student: Student, index: number) => {
                const full =
                    `${student.title + ` ` +
                    student.firstName + ` ` +
                    student.lastName + ` ` +
                    student.email}`;

                console.log(student);
                if (student._id.length) {
                    return (
                        <Grid
                            item
                            key={index}
                        >
                            <Paper
                                className={classes.paper}
                            >
                                <div>
                                    {full}
                                </div>
                            </Paper>
                        </Grid>
                    )
                }
            }
            )
        )
    }
    const filterByValue = () => searchValue.length ?
        FormRow(
            currentGroup.filter((student: Student) =>
                Object.keys(student)
                    .some(() =>
                        student
                            .email
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    )
            )
        ) : FormRow(currentGroup);

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
                <AddPersons
                    setToSearch={setToSearch}
                    add={add}
                    currentGroup={currentGroup}
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
                    {MemberMenu({ member: lecturer, openModal, remove })}
                </Paper>
                <Grid container spacing={1}>
                    {search ? filterByValue() : FormRow(currentGroup)}
                </Grid>
            </StyledPaper>
        </React.Fragment >
    );
}

export default AddStudentsAndProfessors;
