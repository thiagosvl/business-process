import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogContent, DialogActions, ListItem, ListItemText, List, Box, ListItemAvatar, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Process } from '@/types/departmentTypes';

interface DepartmentDetailDialogProps {
    open: boolean;
    onClose: () => void;
}

const DepartmentDetailDialog: React.FC<DepartmentDetailDialogProps> = ({ open, onClose }) => {
    const department = useSelector((state: RootState) => state.department.department);
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Detalhes da área - <b>{department.name}</b></DialogTitle>
            <DialogContent>
                {department && (
                    <div>
                        <Box mt={2}>
                            <b>Processos Vinculados ({department.processes ? department.processes.length : 0}):</b>
                            <List dense>
                                {department.processes && department.processes.map((process: Process) => (
                                    <ListItem key={process.id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon color='action' />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={process.name} secondary={process.type} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DepartmentDetailDialog;
