"use client";

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import { Process } from '../../types/processTypes';

import ProcessList from './ProcessList';
// import ProcessDetailDialog from './ProcessDetailDialog';
// import ProcessDialog from './ProcessDialog';
// import ProcessDeleteConfirmationDialog from './ProcessDeleteConfirmationDialog';

import { setProcessAction, getProcessByIdAction, setProcessDialogAction, changeInEditModeAction, deleteProcessAction, getAllProcessesAction } from '../../store/actions/processActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import SnackbarAlert from '../SnackBarAlert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Processes: React.FC = () => {
    const dispatch = useDispatch();
    const process = useSelector((state: RootState) => state.process.process);
    const processes = useSelector((state: RootState) => state.process.processes);
    const loadingProcesses = useSelector((state: RootState) => state.process.loadingProcesses);
    const departmentDialog = useSelector((state: RootState) => state.process.departmentDialog);
    const [confirmDeleteProcessDialogOpen, setConfirmDeleteProcessDialogOpen] = useState(false);
    const [departmentDetailDialogOpen, setProcessDetailDialogOpen] = useState(false);

    // useEffect(() => {
    //     dispatch(getAllProcessesAction());
    // }, [dispatch]);

    // const handleOpenDialogCreateProcess = () => {
    //     dispatch(changeInEditModeAction(false));
    //     dispatch(setProcessDialogAction(true));
    // };

    // const handleOpenDialogEditProcess = (process: Process) => {
    //     dispatch(changeInEditModeAction(true));
    //     dispatch(setProcessAction(process));
    //     dispatch(setProcessDialogAction(true));
    // };

    // const handleCloseProcessDialog = () => {
    //     dispatch(changeInEditModeAction(false));
    //     dispatch(setProcessDialogAction(false));
    // };

    // const handleOpenDialogProcessDetails = async (process: Process) => {
    //     await dispatch(getProcessByIdAction(process.id))
    //     setProcessDetailDialogOpen(true);
    // }

    // const handleCloseDialogProcessDetails = () => {
    //     setProcessDetailDialogOpen(false);
    // }

    // const handleOpenConfirmDialogDeleteProcess = (process: Process) => {
    //     dispatch(setProcessAction(process));
    //     setConfirmDeleteProcessDialogOpen(true);
    // };

    // const handleCloseConfirmDialogDeleteProcess = () => {
    //     setConfirmDeleteProcessDialogOpen(false);
    // };

    // const confirmDeleteProcess = async () => {
    //     await dispatch(deleteProcessAction(process.id));
    //     handleCloseConfirmDialogDeleteProcess();
    // };

    return (
        <React.Fragment>

        Processos

{/* 
            <Box mt={2} mb={3} display="flex" justifyContent="space-between">
                <div>{processes.length} área(s)</div>
                <Button variant="outlined" color="primary" onClick={handleOpenDialogCreateProcess}>
                    Adicionar
                </Button>
            </Box>

            {loadingProcesses &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            }

            {(!loadingProcesses && processes.length === 0) &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <p>Ainda não há áreas cadastradas.</p>
                </Box>
            } */}

            {/* {!loadingProcesses &&
                <ProcessList
                    onProcessClick={handleOpenDialogProcessDetails}
                    onDeleteClick={handleOpenConfirmDialogDeleteProcess}
                    onEditClick={handleOpenDialogEditProcess}
                />
            } */}

            {/* <ProcessDialog
                open={departmentDialog}
                onClose={handleCloseProcessDialog}
            />

            <ProcessDeleteConfirmationDialog
                open={confirmDeleteProcessDialogOpen}
                onClose={handleCloseConfirmDialogDeleteProcess}
                onConfirm={confirmDeleteProcess}
            />

            <ProcessDetailDialog
                open={departmentDetailDialogOpen}
                onClose={handleCloseDialogProcessDetails}
            /> */}

            <SnackbarAlert />

        </React.Fragment>

    );
};

export default Processes;
