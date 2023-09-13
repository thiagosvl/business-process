import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, FormControl, TextField, DialogActions, Button, InputLabel, Select, MenuItem, FormHelperText, Box, RadioGroup, FormControlLabel, Radio
} from '@mui/material';

import { Department } from '../../types/departmentTypes';
import { initialDepartmentForm, departmentFormInitialErrors } from "../../utils/departmentUtils";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

import { createDepartmentAction, updateDepartmentAction } from '../../store/actions/departmentActions';

interface DepartmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const DepartmentDialog: React.FC<DepartmentDialogProps> = ({
    open, onClose,
}) => {
    const dispatch = useDispatch();
    const department = useSelector((state: RootState) => state.department.department);
    const inEditMode = useSelector((state: RootState) => state.department.inEditMode);
    const [departmentForm, setDepartmentForm] = useState<Department>(initialDepartmentForm);
    const [errors, setErrors] = useState(departmentFormInitialErrors);

    useEffect(() => {
        if(inEditMode){
            setDepartmentForm(department);
        } else {
            setDepartmentForm(initialDepartmentForm);
        }
    }, [inEditMode]);

    const validateFields = () => {
        const errors = {
            name: departmentForm.name.trim() ? [] : ["Campo obrigatório"],
        };

        setErrors(errors);

        return !Object.values(errors).some(errorArray => errorArray.length > 0);
    };

    const resetForm = () => {
        setDepartmentForm(initialDepartmentForm);
        setErrors(departmentFormInitialErrors);
    };

    const submitDepartment = async () => {
        if (!validateFields()) return;

        if (inEditMode) {
            await dispatch(updateDepartmentAction(departmentForm));
        } else {
            await dispatch(createDepartmentAction(departmentForm));
        }
    }

    const handleCloseDialog = () => {
        resetForm();
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{inEditMode ? "Atualizar Área" : "Cadastro de Área"}</DialogTitle>
            <DialogContent>

                <FormControl error={errors.name.length > 0} fullWidth>
                    <TextField autoFocus margin="dense" id="name" autoComplete="off" label="Nome" value={departmentForm.name} error={errors.name.length > 0}
                        onChange={e => setDepartmentForm(prev => ({ ...prev, name: e.target.value }))} />
                    {errors.name.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button variant="contained" onClick={submitDepartment} color="primary">
                    {inEditMode ? "Atualizar" : "Confirmar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DepartmentDialog;
