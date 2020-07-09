import styled from "styled-components";
import { Grid, Paper } from "@material-ui/core";

export const StyledGrid = styled(Grid)`
  && {
    padding: 1rem;
  }
`;

export const StyledItem = styled(Grid)`
  && {
    padding-left: 1rem;
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledTicket = styled(Paper)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledLecturer = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
  }
`;
