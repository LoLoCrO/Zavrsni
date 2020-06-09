import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import AddPersonsForm from '../addPersonsForm';

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

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'white',
        width: '100%',
    },
    input: {
        margin: "7.5%",
        width: "85%"
    },
}));

const AddPersons = ({ currentGroup, add, searchValue, setSearchValue, setToSearch }: any) => {
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
            <AppBar position="static" color="transparent">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Dodaj" onClick={() => setToSearch(false)} />
                    <Tab label="Pretrazi" onClick={() => setToSearch(true)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {
                        AddPersonsForm({ currentGroup, add })
                    }
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <TextField
                        className={classes.input}
                        id='name'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        label="Pretraga"
                        type="text"
                        color='secondary'
                        variant="outlined"
                        inputProps={{
                            maxLength: 30,
                        }}
                    />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default AddPersons;
