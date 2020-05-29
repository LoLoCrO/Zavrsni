import styled from "styled-components";
import {
  Paper,
  Typography,
  RadioGroup,
  Radio,
  TextField,
  Button,
} from "@material-ui/core";
import { Form } from "formik";

export const StyledPaper = styled(Paper)`
  && {
    margin: auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
    padding-top: 2vw;
    padding-bottom: 2vw;
    width: 80vw;
    display: table;
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    padding: 3vw;
    color: #424242;
    font-size: 22;
    text-align: center;
  }
`;

export const StyledForm = styled(Form)`
  && {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  && {
    padding-left: 3vw;
    padding-left: 3vw;
    flex-direction: row;
    justify-content: center;
  }
`;

export const StyledRadio = styled(Radio)`
  && {
    width: 10vw;
    display: inline-block;

    @media (min-width: 768px) {
      width: 5vw;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  margin: 5%;
  width: 90%;
`;

export const StyledButton = styled(Button)`
  && {
    color: #424242;
    border: 1px solid #c4c4c4;
    margin: 5vw;
    align-self: center;
    background-color: #ececec;
    text-transform: none;

    @media (min-width: 768px) {
      padding: 1vw;
    }
  }
`;
