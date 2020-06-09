import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IMemberMenu } from '../../src/ts/interfaces/member.interface';

const MemberMenu = ({ member, openModal, remove }: IMemberMenu): JSX.Element => {

    const deleteMember = ({ close }: any) => {
        remove(member._id);
        close();
    }

    const rename = ({ close }: any) => {
        console.log(typeof close)
        openModal(member);
        close();
    }

    return (
        <PopupState variant="popover" popupId="popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <IconButton {...bindTrigger(popupState)}>
                        <MoreVertIcon color='primary' />
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
                            onClick={() => deleteMember(popupState)}
                        >
                            Obrisi
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

export default MemberMenu;