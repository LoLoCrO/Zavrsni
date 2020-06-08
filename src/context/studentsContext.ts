// @flow
import * as React from "react";
import { Student } from "../ts/interfaces/users.interface";
import { students } from "../../lib/mocks/students";

export const StudentContext = React.createContext<Student>(students[0]);
