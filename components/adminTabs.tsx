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

const a11yProps = (index: any) => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
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

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Najvisa Ocjena" {...a11yProps(0)} />
                    <Tab label="Najniza Ocjena" {...a11yProps(1)} />
                    <Tab label="Najvise Komentara" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {[0, 1, 2].map((index: number) =>
                    <TabPanel
                        key={index}
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