import React from 'react';
import { Avatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    useStyles,
    DrawerBox,
    StyledPaper,
    StyledEditIcon,
    StyledCancelPresentationIcon,
    Wrapper,
    StyledBox,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '../lib/styles/professorProfile';
import Drawer from '../components/drawer';
import EditProfessor from "../components/editProfessor";
import { Professor } from '../src/ts/interfaces/users.interface';
import { professors } from '../lib/mocks/professors';
import { NextPage } from 'next';
import axios from 'axios';

const ProfessorProfle: NextPage = ({ prof }: any): JSX.Element => {

    const classes = useStyles()

    const [editProfessor, setEditProfessor] = React.useState<boolean>(false);

    const [professor, setProfessor] = React.useState<Professor>(prof ? prof : professors[0]);

    const postUpdate = async (prof: Professor) =>
        await axios.patch('http://localhost:3000/api/professors/update', prof)
            .then(res => {
                if (!res.data.success) {
                    window.alert('Doslo je do pogreske!')
                    console.log(res)
                }
                setProfessor(res.data.professor);
                setEditProfessor(!editProfessor);
            })
            .catch(err => {
                window.alert('Doslo je do pogreske!')
                console.log(err);
            });

    return (
        <React.Fragment>
            <DrawerBox>
                <Drawer />
            </DrawerBox>
            <StyledPaper elevation={3}>
                {
                    editProfessor ?
                        <StyledCancelPresentationIcon
                            color={'secondary'}
                            onClick={() => setEditProfessor(!editProfessor)}
                        />
                        :
                        <StyledEditIcon
                            color={'secondary'}
                            onClick={() => setEditProfessor(!editProfessor)}
                        />
                }
                <Wrapper>
                    <Avatar
                        alt={professor.firstName + ` ` + professor.lastName}
                        className={classes.large}
                        src="https://picsum.photos/400"
                    />
                </Wrapper>
                {
                    editProfessor ?
                        EditProfessor({ professor, postUpdate }) :
                        <div>
                            <StyledBox>
                                {professor.firstName + ' ' + professor.lastName}
                            </StyledBox>
                            <StyledBox>
                                {professor.title}
                            </StyledBox>
                            <StyledBox>
                                {professor.email}
                            </StyledBox>
                            <StyledBox>
                                overallGrade: {professor.overallGrade}
                            </StyledBox>
                            <ExpansionPanel
                                TransitionProps={{ unmountOnExit: true }}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <StyledBox fontSize={16}>
                                        {professor.comments?.length ? 'Komentari' : 'Nema komentara'}
                                    </StyledBox>
                                </ExpansionPanelSummary>
                                {
                                    professor.comments?.length ?
                                        professor.comments.map((comment: string, index: number) =>
                                            <ExpansionPanelDetails key={index}>
                                                <StyledBox>
                                                    {comment}
                                                </StyledBox>
                                            </ExpansionPanelDetails>
                                        ) : null
                                }
                            </ExpansionPanel>
                        </div>
                }
            </StyledPaper>
        </React.Fragment>
    );
}

ProfessorProfle.getInitialProps = async ({ query, res }: any) => {
    const { professor } = query;
    // console.log(query, JSON.parse(professor))
    if (!professor) {
        return res.redirect('/adminHome');
    } else return {
        prof: JSON.parse(professor)
    };
}

export default ProfessorProfle;
