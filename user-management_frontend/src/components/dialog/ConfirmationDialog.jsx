import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide
} from '@mui/material';

function ConfirmationDialog(props) {
    const [open, setOpen] = useState(true);
    const { DialogTitle: title = 'Are you sure?', DialogContent: content = 'Pressing "Yes" will change something. Are you sure you want to proceed?' } = props;
    const Transition = React.forwardRef((props, ref) => {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleYes = () => {
        props.onClose(true);
        setOpen(false);
    };

    const handleNo = () => {
        props.onClose(false);
        setOpen(false);
    };

    return (
        <Dialog maxWidth="xs" TransitionComponent={Transition} keepMounted open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                <Button onClick={handleNo}>
                    No
                </Button>
                <Button onClick={handleYes}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;

ConfirmationDialog.propTypes = {
    DialogTitle: PropTypes.node,
    DialogContent: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};