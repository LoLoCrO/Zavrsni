import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { professors } from '../lib/mocks/professors';
import { Professor } from '../src/ts/interfaces/professor.interface';

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
    orderBy: number;
};

const AdminTabExpansionPanels = ({ orderBy }: Props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    let profs: Professor[] = professors;

    if (orderBy === 0) {
        profs.sort((a, b) => b.overallGrade - a.overallGrade);
    } else if (orderBy === 1) {
        profs.sort((a, b) => a.overallGrade - b.overallGrade);
    } else {
        profs.sort((a, b) => a.comments.length - b.comments.length);
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
                <ExpansionPanelDetails key={index}>
                    <Typography className={classes.heading}>
                        {orderBy === 2 ? prof.comments.length : prof.overallGrade}
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