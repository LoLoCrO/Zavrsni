import React from 'react';
import { Modal } from '@material-ui/core';
import Body from './body';
import { IGroupModal } from '../../src/ts/interfaces/studentGroup.interface';

const GroupModal =
    ({ open, handleClose, groupName, addOrEditGroup }: IGroupModal) =>
        <Modal
            disableBackdropClick
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {Body({ handleClose, groupName, addOrEditGroup })}
        </Modal>

export default GroupModal;
