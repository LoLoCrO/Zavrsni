import React from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemText, Drawer, IconButton } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';

const StyledIconButton = styled(IconButton)`
    && {
        position: absolute;
        padding: 0;
        margin: 0;
    }
`;

const TemporaryDrawer = () => {
    const [state, setState] = React.useState<boolean>(false);

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
                {['Pocetna', 'Uredivanje predavca', 'Dodavanje predavaca', 'Drafts']
                    .map((text: string) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
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