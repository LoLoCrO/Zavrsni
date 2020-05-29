import { Form } from "formik";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

export const StyledForm = styled(Form)`
  justify-content: center;
  display: grid;
  margin: 8%;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 12%;
`;

export const StyledButton = styled(Button)`
  border-radius: 5px;
  border: 2px solid F50057;
`;
