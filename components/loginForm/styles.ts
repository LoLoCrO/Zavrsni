import styled from "styled-components";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { Form } from "formik";

export const StyledPaper = styled(Paper)`
  && {
    margin: auto;
    margin-top: 15vh;
    padding: 5vw;
    width: 80vw;

    @media (min-width: 768px) {
      padding-top: 3vw;
      padding-bottom: 3vw;
      width: 40vw;
    }
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    width: 65vw;
    padding-left: 2.5vw;
    margin: 0;
    color: #424242;
    font-size: 22;
    display: block;

    @media (min-width: 768px) {
      padding-left: 0;
      width: 30vw;
    }
  }
`;

export const StyledForm = styled(Form)`
  && {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 65vw;
    margin: 2.5vw;

    @media (min-width: 768px) {
      width: 30vw;
      margin: 0;
      margin-top: 3vw;
    }
  }
`;

export const StyledButton = styled(Button)`
  && {
    color: #424242;
    border: 1px solid #c4c4c4;
    margin-top: 3vh;
    padding: 2vw;
    align-self: center;
    background-color: #ececec;
    text-transform: none;

    @media (min-width: 768px) {
      margin-top: 3vw;
      padding: 1vw;
    }
  }
`;
