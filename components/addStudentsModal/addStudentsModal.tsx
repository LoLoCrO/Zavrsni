import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from '@material-ui/core';
import Body from './body';
import { StudentGroup } from '../../pages/addStudents';

interface Props {
    open: boolean;
    groupName: StudentGroup | null;
    handleClose: () => void;
    addOrEditGroup: ({ _id, name }: StudentGroup) => void;
}

const AddStudentsModal =
    ({ open, handleClose, groupName, addOrEditGroup }: Props) =>
        <Modal
            disableBackdropClick
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {Body({ handleClose, groupName, addOrEditGroup })}
        </Modal>

export default AddStudentsModal;
