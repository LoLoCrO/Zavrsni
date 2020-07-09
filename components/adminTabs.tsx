import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AdminTabExpansionPanels from "./adminTabExpansionPanel";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const tabProps = (label: string) => ({
    id: `full-width-tab-${label}`,
    'aria-controls': `full-width-tabpanel-${label}`,
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderRadius: '0px 0px 10px 10px',
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
}));

const FullWidthTabs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const tabs: string[] = ["Najvisa Ocjena", "Najniza Ocjena", "Najvise Komentara"];

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const listTabs = (labels: string[]) =>
        labels.map((label: string) =>
            <Tab label={label} {...tabProps(label)} />)

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {listTabs(tabs)}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map((tab: string, index: number) =>
                    <TabPanel
                        key={tab}
                        value={value}
                        index={index}
                        dir={theme.direction}
                    >
                        <AdminTabExpansionPanels
                            orderBy={index}
                        />
                    </TabPanel>
                )}
            </SwipeableViews>
        </div>
    );
}

export default FullWidthTabs;