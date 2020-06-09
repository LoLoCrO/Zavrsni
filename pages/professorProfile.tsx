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

const StudentHome: React.FunctionComponent = (): JSX.Element => {

    const [editProfessor, setEditProfessor] = React.useState<boolean>(false);

    const classes = useStyles()

    const [professor, setProfessor] = React.useState<Professor>(professors[0])

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
                        EditProfessor({ professor, setProfessor }) :
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
                                    <StyledBox fontSize={16}>Komentari</StyledBox>
                                </ExpansionPanelSummary>
                                {professor.comments.map((comment: string, index: number) =>
                                    <ExpansionPanelDetails key={index}>
                                        <StyledBox>
                                            {comment}
                                        </StyledBox>
                                    </ExpansionPanelDetails>
                                )}
                            </ExpansionPanel>
                        </div>
                }
            </StyledPaper>
        </React.Fragment>
    );
}

export default StudentHome;
