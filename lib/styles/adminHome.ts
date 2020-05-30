import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";

export const StyledPaper = styled(Paper)`
  && {
    position: relative;
    background-color: white;
    margin-top: 2.5rem;
    border-radius: 10px;
    display: table;
    width: 85vw;
    @media (min-width: 768px) {
      margin: 2.5rem;
    }
  }
`;

export const Title: any = styled(Typography)`
  && {
    color: #646464;
    font-weight: 600;
    font-size: 1.5rem;
    padding: auto;
    margin: 2rem;
    text-align: center;
    border-radius: 10px;
    text-shadow: 2px 2px 4px #6e6e6e;
  }
`;

export const TemporaryDrawerWrapper = styled.div`
  && {
    margin-top: 1rem;
    margin-left: 1.3rem;
  }
`;
