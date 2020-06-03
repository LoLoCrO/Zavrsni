import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    addGroupButton: {
      float: 'right',
      marginRight: '1.5rem',
      marginBottom: "2rem",
    },
  })
);

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
    border-radius: 0 0 10px 0;
  }
`;
