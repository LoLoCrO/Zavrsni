import React from 'react';
import { DrawerBox, StyledPaper, useStyles } from '../lib/styles/addGroups';
import Drawer from '../components/drawer';
import { Paper, Button, } from '@material-ui/core';
import MemberModal from '../components/memberModal';
// import { professors } from '../lib/mocks/professors';
// import { students } from '../lib/mocks/students';
import { Student } from '../src/ts/interfaces/users.interface';
import { Member } from '../src/ts/interfaces/member.interface';
import MemberMenu from '../components/memberMenu';
import { Professor } from '../src/ts/interfaces/users.interface';
import AddPersons from '../components/addPersons';
import { Title } from '../lib/styles/adminHome';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { StyledItem, StyledTicket, StyledLecturer, StyledGrid, Sticky } from '../lib/styles/populategroup';
import axios from 'axios';
import { NextPage } from 'next';
import Router from 'next/router';


const PopulateGroup: NextPage =
    ({ group, groupStudents, groupLecturer, students, professors }: any): JSX.Element => {

        if (process.browser) {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            if (!token && Router || role !== 'admin') { Router.push('/login') };
        }

        const classes = useStyles();

        const initialMember: Member = { _id: '', role: 'none', email: '' };
        const initialLecturer: Professor = {
            _id: '', role: 'professor', email: '', firstName: '', lastName: ''
        };

        const [lecturer, setLecturer] = React.useState<Professor>(
            groupLecturer ? groupLecturer : initialLecturer
        );
        const [open, setOpen] = React.useState<boolean>(false);
        const [search, setToSearch] = React.useState<boolean>(false);
        const [member, setMember] = React.useState<Member>(initialMember);
        const [currentGroup, setCurrentGroup] = React.useState<Student[]>(
            groupStudents ? groupStudents : []
        );
        const [searchValue, setSearchValue] = React.useState<string>('');

        React.useEffect(() => console.log(currentGroup), [currentGroup])
        React.useEffect(() => console.log(lecturer), [lecturer])

        const handleClose = () => setOpen(false);

        const openModal = ({ _id, role, email }: Member) => {
            setMember({ _id, role, email });
            setOpen(true)
        }

        const edit = ({ _id }: Member) => {
            const newLecturer = professors.find((professor: Professor) => professor._id === _id);
            if (newLecturer) {
                console.log('Dodajem: ', newLecturer);
                setLecturer(newLecturer);
            }
            setMember(initialMember);
            setOpen(false);
        };

        const add = (student: Student) => {
            if (!currentGroup.includes(student) && student._id.length > 0) {
                setCurrentGroup(Object.assign([], [student, ...currentGroup]));
                setOpen(false);
            }
        };

        const save = async () =>
            await axios.post('http://localhost:3000/api/groups/populate', {
                group: Object.assign({},
                    (lecturer._id.length ? group : (delete group.lecturer, group)), {
                    students: currentGroup,
                    ...(lecturer._id.length ? { lecturer } : {}),
                })
            }).then(res => {
                if (!res.data.success) {
                    alert('Doslo je do pogreske!')
                    console.log(res.data.success)
                }
                return Router.push('/addGroups');
            }).catch(err => {
                alert('Doslo je do pogreske!')
                console.log(err);
            });

        const removeLecturer = () => setLecturer(initialLecturer);

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
                    if (student && student._id && student._id.length) {
                        return (
                            <StyledItem
                                item
                                key={index}
                            >
                                <StyledTicket
                                    className={classes.paper}
                                >
                                    <div>
                                        {full}
                                    </div>
                                    <Button
                                        onClick={() => remove(student._id)}
                                    >
                                        <HighlightOffIcon color='secondary' />
                                    </Button>
                                </StyledTicket>
                            </StyledItem>
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
                    students={students}
                    professors={professors}
                />
                <DrawerBox>
                    <Sticky>
                        <Drawer type='admin' />
                    </Sticky>
                </DrawerBox>
                <StyledPaper elevation={3}>
                    <Title>
                        {group.name}
                    </Title>
                    <AddPersons
                        setToSearch={setToSearch}
                        add={add}
                        save={save}
                        currentGroup={currentGroup}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        students={students}
                    />
                    <Paper
                        className={classes.paper}
                    >
                        <Title
                            color='primary'
                        >
                            Predavac:
                    </Title>
                        <StyledItem>
                            <StyledLecturer>
                                {lecturer && lecturer._id && lecturer._id.length > 0 ?
                                    `${lecturer.title ? `${lecturer.title} ` : ` `}` +
                                    lecturer.firstName + ` ` +
                                    `${lecturer.middleName ? ` ${lecturer.middleName} ` : ` `}` +
                                    lecturer.lastName + ` ` +
                                    lecturer.email
                                    : `Dodaj predavaca ->`
                                }
                            </StyledLecturer>
                            {MemberMenu({ member: { ...lecturer, role: 'professor' }, openModal, removeLecturer })}
                        </StyledItem>
                    </Paper>
                    <Title color='secondary'>
                        Studenti:
                </Title>
                    <StyledGrid container spacing={1}>
                        {search ? filterByValue() : FormRow(currentGroup)}
                    </StyledGrid>
                </StyledPaper>
            </React.Fragment >
        );
    }

PopulateGroup.getInitialProps = async ({ query, res }: any) => {
    const { _id } = query;

    if (!_id) {
        res.redirect('/addGroups');
    }

    const {
        allProfessors: { professors },
        allStudents: { students },
        getGroup: { group, groupStudents }
    } = await axios.get('http://localhost:3000/api/groups', {
        params: {
            _id
        }
    })
        .then(res => {
            if (!res.data.success) {
                window.alert('Doslo je do pogreske!')
                console.log(res)
            }
            return res.data;
        })
        .catch(err => {
            window.alert('Doslo je do pogreske!')
            console.log(err)
            return res.redirect('/addGroups');
        });

    return {
        group,
        groupStudents,
        groupLecturer: professors.find(({ _id }: Professor) => _id === group.lecturer),
        students,
        professors
    };
}

export default PopulateGroup;
