import styled from "styled-components";
import {
  Paper,
  Box,
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

export const StyledPaper = styled(Paper)`
  && {
    background-color: white;
    margin-top: 5vw;
    margin-bottom: 5vw;
    display: table;
    padding: 1.5rem;
    width: 90vw;
    border-radius: 10px;
  }
`;

export const StyledEditIcon = styled(EditIcon)`
  float: right;
`;

export const StyledCancelPresentationIcon = styled(CancelPresentationIcon)`
  float: right;
`;

export const StyledBox = styled(Box)`
  && {
    padding: 1vw;
    color: #424242;
    font-size: 22;
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  && {
    margin: 2rem;
    display: flex;
    justify-content: center;
  }
`;

export const DrawerBox = styled.div`
  && {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    width: 4rem;
    background-color: white;
    padding-top: 1rem;
    padding-bottom: 2.5rem;
    box-shadow: 1px 1px 1px #ececec;
  }
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
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
    },
  })
);

export const ExpansionPanel = withStyles({
  root: {
    borderRadius: "10px 10px",
    marginTop: "2rem",
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
      marginTop: "2rem",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      borderRadius: "10px 10px 0px 0px",
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);
