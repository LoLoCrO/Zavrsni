import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      top: `25%`,
      left: `25%`,
      position: "absolute",
      width: "50%",
      backgroundColor: "white",
      outline: "none",
      "@media(max-width: 768px)": {
        top: `25%`,
        left: `10%`,
        width: "80%",
      },
    },
    input: {
      margin: "5%",
      width: "90%",
    },
    cancel: {
      margin: "5%",
      float: "left",
    },
    confirm: {
      margin: "5%",
      float: "right",
    },
    title: {
      margin: "5%",
    },
  })
);
