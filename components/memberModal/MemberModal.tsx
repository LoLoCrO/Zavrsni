import React from 'react';
import { Modal } from '@material-ui/core';
import Body from './body';
import { IMemberModal } from '../../src/ts/interfaces/member.interface';

const MemberModal =
    ({ open, handleClose, member, edit }: IMemberModal) =>
        <Modal
            disableBackdropClick
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {Body({ handleClose, member, edit })}
        </Modal>

export default MemberModal
    ;
