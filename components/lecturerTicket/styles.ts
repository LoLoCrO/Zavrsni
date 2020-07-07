import styled from "styled-components";
import { Container } from "@material-ui/core";

export const LecturerBox = styled(Container)`
  && {
    min-height: 6rem;
    padding: 1vw;
    width: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const LecturerPhoto = styled.div`
  && {
    height: 5vh;
    align-self: flex-start;
  }
`;

export const LecturerInfo = styled.div`
  && {
    display: flex;
    text-align: start;
    height: 4rem;
    overflow: hidden;
    white-space: nowrap;
    align-items: flex-end;
    align-self: flex-start;
  }
`;
