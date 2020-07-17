import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { professors } from '../lib/mocks/professors';
import { Professor } from '../src/ts/interfaces/users.interface';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface Props {
    professors: any;
    orderBy: number;
};

const AdminTabExpansionPanels = ({ orderBy, professors }: Props) => {
    console.log('AdminTabExpansionPanels', professors)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    let profs: Professor[] = professors;

    if (orderBy === 0) {
        profs.sort((a, b) =>
            b.overallGrade && a.overallGrade ? b.overallGrade - a.overallGrade : 0
        );
    } else if (orderBy === 1) {
        profs.sort((a, b) =>
            b.overallGrade && a.overallGrade ? a.overallGrade - b.overallGrade : 0
        );
    } else {
        profs.sort((a, b) =>
            b.comments && a.comments ? a.comments.length - b.comments.length : 0
        );
    }

    const handleChange = (panel: string) =>
        (event: React.ChangeEvent<{}>, isExpanded: boolean) =>
            setExpanded(isExpanded ? panel : false);

    return (
        <ExpansionPanel
            className={classes.root}
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>
                    {orderBy === 2 ? 'Broj komentara' : 'Ocjena'}
                </Typography>
                <Typography className={classes.secondaryHeading}>&ensp; Predavac</Typography>
            </ExpansionPanelSummary>
            {profs.map((prof: Professor, index: number) =>
                <ExpansionPanelDetails
                    key={index}
                    onClick={() => Router.push({
                        pathname: '/professorProfile',
                        query: {
                            professor: JSON.stringify(prof)
                        }
                    })}
                >
                    <Typography className={classes.heading}>
                        {
                            // @ts-ignore
                            orderBy === 2 ? prof.comments.length : prof.overallGrade
                        }
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        {prof.title + ' ' + prof.firstName + ' ' + prof.lastName}
                    </Typography>
                </ExpansionPanelDetails>
            )}
        </ExpansionPanel>
    );
}

export default AdminTabExpansionPanels;