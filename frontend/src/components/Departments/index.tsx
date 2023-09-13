"use client";

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import { Department } from '../../types/departmentTypes';

import DepartmentList from './DepartmentList';
import DepartmentDetailDialog from './DepartmentDetailDialog';
import DepartmentDialog from './DepartmentDialog';
import DepartmentDeleteConfirmationDialog from './DepartmentDeleteConfirmationDialog';

import { setDepartmentAction, getDepartmentByIdAction, setDepartmentDialogAction, changeInEditModeAction, deleteDepartmentAction, getAllDepartmentsAction } from '../../store/actions/departmentActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import SnackbarAlert from '../SnackBarAlert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Departments: React.FC = () => {
    const dispatch = useDispatch();
    const department = useSelector((state: RootState) => state.department.department);
    const departments = useSelector((state: RootState) => state.department.departments);
    const loadingDepartments = useSelector((state: RootState) => state.department.loadingDepartments);
    const departmentDialog = useSelector((state: RootState) => state.department.departmentDialog);
    const [confirmDeleteDepartmentDialogOpen, setConfirmDeleteDepartmentDialogOpen] = useState(false);
    const [departmentDetailDialogOpen, setDepartmentDetailDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllDepartmentsAction());
    }, [dispatch]);

    const handleOpenDialogCreateDepartment = () => {
        dispatch(changeInEditModeAction(false));
        dispatch(setDepartmentDialogAction(true));
    };

    const handleOpenDialogEditDepartment = (department: Department) => {
        dispatch(changeInEditModeAction(true));
        dispatch(setDepartmentAction(department));
        dispatch(setDepartmentDialogAction(true));
    };

    const handleCloseDepartmentDialog = () => {
        dispatch(changeInEditModeAction(false));
        dispatch(setDepartmentDialogAction(false));
    };

    const handleOpenDialogDepartmentDetails = async (department: Department) => {
        await dispatch(getDepartmentByIdAction(department.id))
        setDepartmentDetailDialogOpen(true);
    }

    const handleCloseDialogDepartmentDetails = () => {
        setDepartmentDetailDialogOpen(false);
    }

    const handleOpenConfirmDialogDeleteDepartment = (department: Department) => {
        dispatch(setDepartmentAction(department));
        setConfirmDeleteDepartmentDialogOpen(true);
    };

    const handleCloseConfirmDialogDeleteDepartment = () => {
        setConfirmDeleteDepartmentDialogOpen(false);
    };

    const confirmDeleteDepartment = async () => {
        await dispatch(deleteDepartmentAction(department.id));
        handleCloseConfirmDialogDeleteDepartment();
    };

    return (
        <React.Fragment>

            <Box mt={2} mb={3} display="flex" justifyContent="space-between">
                <div>{departments.length} área(s)</div>
                <Button variant="outlined" color="primary" onClick={handleOpenDialogCreateDepartment}>
                    Adicionar
                </Button>
            </Box>

            {loadingDepartments &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            }

            {(!loadingDepartments && departments.length === 0) &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <p>Ainda não há áreas cadastradas.</p>
                </Box>
            }

            {!loadingDepartments &&
                <DepartmentList
                    onDepartmentClick={handleOpenDialogDepartmentDetails}
                    onDeleteClick={handleOpenConfirmDialogDeleteDepartment}
                    onEditClick={handleOpenDialogEditDepartment}
                />
            }

            <DepartmentDialog
                open={departmentDialog}
                onClose={handleCloseDepartmentDialog}
            />

            <DepartmentDeleteConfirmationDialog
                open={confirmDeleteDepartmentDialogOpen}
                onClose={handleCloseConfirmDialogDeleteDepartment}
                onConfirm={confirmDeleteDepartment}
            />

            <DepartmentDetailDialog
                open={departmentDetailDialogOpen}
                onClose={handleCloseDialogDepartmentDetails}
            />

            <SnackbarAlert />

        </React.Fragment>

    );
};

export default Departments;
