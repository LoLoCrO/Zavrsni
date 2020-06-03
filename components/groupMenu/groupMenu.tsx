import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IGroupMenu } from '../../src/ts/interfaces/studentGroup.interface';

const GroupMenu = ({ group: { _id }, openModal, removeGroup }: IGroupMenu): JSX.Element => {

    const deleteGroup = ({ close }: any) => {
        removeGroup(_id);
        close();
    }

    const rename = ({ close }: any) => {
        openModal(_id);
        close();
    }

    return (
        <PopupState variant="popover" popupId="popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <IconButton {...bindTrigger(popupState)}>
                        <MoreVertIcon color='secondary' />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem
                            onClick={() => rename(popupState)}
                        >
                            Preimenuj
                        </MenuItem>
                        <MenuItem onClick={popupState.close}>Uredi</MenuItem>
                        <MenuItem
                            color='secondary'
                            onClick={() => deleteGroup(popupState)}
                        >
                            Obrisi
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

export default GroupMenu;