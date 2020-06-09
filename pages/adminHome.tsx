import React from 'react';
import TemporaryDrawer from '../components/drawer';
import FullWidthTabs from '../components/adminTabs';
import { StyledPaper, TemporaryDrawerWrapper, Title } from '../lib/styles/adminHome';

const AdminHome: React.FunctionComponent = (): JSX.Element =>
    <StyledPaper elevation={3}>
        <TemporaryDrawerWrapper>
            <TemporaryDrawer />
        </TemporaryDrawerWrapper>
        <Title width={1}>
            Vaši predavači
        </Title>
        <FullWidthTabs />
    </StyledPaper>;

export default AdminHome;
