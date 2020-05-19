import React from 'react';
import styled from 'styled-components';
import { Paper, Box, Avatar } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Drawer from '../components/drawer';

const StyledPaper = styled(Paper)`
    && {
        background-color: white;
        margin-top: 5vw;
        padding: 1.5rem;
        width: 90vw;
        border-radius: 10px;
    }
`;

const StyledBox = styled(Box)`
    && {
        padding: 1vw;
        color: #424242;
        font-size: 22;
        text-align: center;
    }
`;

const Wrapper = styled.div`
    && {
        margin: 2rem;
        display: flex;
        justify-content: center;
    }
`;

const DrawerBox = styled.div`
    && {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        width: 4rem;
        border-radius: 0 0 10px 0;
        background-color: white;
        padding-top: 1rem;
         padding-bottom: 2.5rem;
        box-shadow: 1px 1px 1px #ececec;
    }
`;

interface Professor {
    firstName: string,
    lastName: string,
    title: string,
    email: string,
    overallGrade: number,
    grades: number[],
    comments: string[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        }
    }),
);

const ExpansionPanel = withStyles({
    root: {
        marginTop: '2rem',
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const StudentHome: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles()

    const professor: Professor = {
        firstName: 'Ivan',
        lastName: 'Ivic',
        title: 'Dr.sc.',
        email: 'ivan.ivic@mail.com',
        overallGrade: 3.7,
        grades: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
        comments: [
            'nesto nesto nesto nesto nesto nesto nesto nesto nesto nesto nesto',
            'nesto  nesto nesto nesto nesto nesto nesto',
            'nesto  nesto nesto nesto nesto',
            'nesto', 'nesto', 'nesto', 'nesto', 'nesto'
        ]
    };

    return (
        <React.Fragment>
            <DrawerBox>
                <Drawer />
            </DrawerBox>
            <StyledPaper elevation={3}>
                <Wrapper>
                    <Avatar
                        alt={professor.firstName + ` ` + professor.lastName}
                        className={classes.large}
                        src="https://picsum.photos/400"
                    />
                </Wrapper>
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
            </StyledPaper>
        </React.Fragment>
    );
}

export default StudentHome;
