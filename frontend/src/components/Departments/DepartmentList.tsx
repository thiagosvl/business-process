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
import { Department } from '../../types/departmentTypes';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

interface DepartmentListProps {
    onDepartmentClick: (department: Department) => void;
    onDeleteClick: (department: Department) => void;
    onEditClick: (department: Department) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ onDepartmentClick, onDeleteClick, onEditClick }) => {
    const departments = useSelector((state: RootState) => state.department.departments);

    return (
        <List dense>
            {departments && departments.map((department: Department, key) => (
                <ListItem
                    key={department.id}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon color='action' />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={department.name}
                        secondary={department.processCount + ' processos'} />
                    <IconButton arial-label="details" onClick={() => onDepartmentClick(department)}>
                        <VisibilityIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => onEditClick(department)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDeleteClick(department)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
}

export default React.memo(DepartmentList);
