import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';

interface DepartmentDeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DepartmentDeleteConfirmationDialog: React.FC<DepartmentDeleteConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Você tem certeza de que deseja excluir?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button variant="contained" onClick={onConfirm} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DepartmentDeleteConfirmationDialog;
