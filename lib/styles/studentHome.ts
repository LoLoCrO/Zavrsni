import styled from "styled-components";
import { Paper, Typography, Container } from "@material-ui/core";

export const StyledPaper = styled(Paper)`
  && {
    width: 80vw;
    background-color: white;
    margin: 5vw;
    margin-top: 2rem;
    border-radius: 10px;
    display: table;
  }
`;

export const Title: any = styled(Typography)`
  && {
    color: #666666;
    font-weight: 600;
    font-size: 1.5rem;
    padding: auto;
    margin-top: 2rem;
    text-align: center;
    border-radius: 10px;
    text-shadow: 2px 2px 4px #6e6e6e;
  }
`;

export const StyledContainer = styled(Container)`
  && {
    padding: 0;
  }
`;

export const Ticket = styled(Paper)`
  && {
    background-color: #ececec;
    margin: 2rem;
    height: auto;
    width: auto;

    @media (min-width: 768px) {
      width: 40%;
      display: inline-block;
    }
  }
`;
