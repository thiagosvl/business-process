"use client";

import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Process } from '../../types/processTypes';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

interface ProcessListProps {
    onProcessClick: (process: Process) => void;
    onDeleteClick: (process: Process) => void;
    onEditClick: (process: Process) => void;
}

const ProcessList: React.FC<ProcessListProps> = ({ onProcessClick, onDeleteClick, onEditClick }) => {
    const processes = useSelector((state: RootState) => state.process.processes);

    return (
        <List dense>
            {processes && processes.map((process: Process, key) => (
                <ListItem
                    key={process.id}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon color='action' />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={process.name}
                        secondary={process.processCount + ' processos'} />
                    <IconButton arial-label="details" onClick={() => onProcessClick(process)}>
                        <VisibilityIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => onEditClick(process)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDeleteClick(process)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
}

export default React.memo(ProcessList);
