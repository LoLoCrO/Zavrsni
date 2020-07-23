import React from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemText, Drawer, IconButton } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import Router from 'next/router';

const StyledIconButton = styled(IconButton)`
    && {
        position: absolute;
        padding: 0;
        margin: 0;
    }
`;

const TemporaryDrawer = ({ type }: any) => {
    const [state, setState] = React.useState<boolean>(false);

    const routes = type === 'admin' ?
        [
            { label: 'Grupe', route: '/addGroups' },
            { label: 'Naslovna', route: '/adminHome' },
            { label: 'Odjavi me', route: '/login' }
        ]
        :
        [
            { label: 'Odjavi me', route: '/login' }
        ];

    const deauth = async (route: string) => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        Router.push(route);
    };

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) { return; }

            setState(open);
        };

    const list = (): JSX.Element => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {routes
                    .map(({ label, route }) => (
                        <ListItem
                            key={label}
                            button
                            onClick={() =>
                                route === '/login'
                                    ? deauth(route)
                                    : Router.push(route)
                            }
                        >
                            <ListItemText primary={label} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <StyledIconButton
                onClick={toggleDrawer(true)}
            >
                <MenuSharpIcon />
            </StyledIconButton>
            <Drawer
                anchor={'top'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </React.Fragment>
    );
}

export default TemporaryDrawer;