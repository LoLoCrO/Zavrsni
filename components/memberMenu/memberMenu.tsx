import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IMemberMenu } from '../../src/ts/interfaces/member.interface';

const MemberMenu = ({ member, openModal, removeLecturer }: IMemberMenu): JSX.Element => {

    const deleteMember = ({ close }: any) => {
        removeLecturer();
        close();
    }

    const rename = ({ close }: any) => {
        console.log(typeof close)
        openModal(member);
        close();
    }

    console.log(member._id)
    return (
        <PopupState variant="popover" popupId="popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <IconButton {...bindTrigger(popupState)}>
                        <MoreVertIcon color='primary' />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                        {
                            (member._id.length > 1) ?
                                [
                                    <MenuItem
                                        key='p'
                                        onClick={() => rename(popupState)}
                                    >
                                        Promjeni
                                    </MenuItem>,
                                    <MenuItem
                                        key='o'
                                        color='secondary'
                                        onClick={() => deleteMember(popupState)}
                                    >
                                        Obrisi
                                    </MenuItem>
                                ]
                                :
                                <MenuItem
                                    onClick={() => rename(popupState)}
                                >
                                    Dodaj
                                </MenuItem>
                        }
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

export default MemberMenu;