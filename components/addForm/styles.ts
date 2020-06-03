import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    input: {
      margin: "2.5%",
      width: "50%",
      "@media(max-width: 768px)": {
        margin: "7.5%",
        width: "85%",
      },
    },
    addGroupButton: {
      margin: "2.5%",
      padding: "1rem",
      float: "right",
      marginRight: "7.5%",
      marginBottom: "2rem",
    },
  })
);
