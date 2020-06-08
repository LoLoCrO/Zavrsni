// @flow
import * as React from "react";
import { Professor } from "../ts/interfaces/users.interface";
import { professors } from "../../lib/mocks/professors";

export const ProfessorContext = React.createContext<Professor>(professors[0]);
