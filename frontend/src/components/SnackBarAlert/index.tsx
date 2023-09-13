import React from 'react';
import { Snackbar, Button, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import { removeAlert } from '../../store/actions/alertActions';

interface SnackbarAlertProps {
    autoHideDuration?: number;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ autoHideDuration = 6000 }) => {
    const dispatch = useDispatch();
    const alerts = useSelector((state: RootState) => state.alert);

    return (
        <>
            {alerts.map((alert) => (
                <Snackbar
                    key={alert.id}
                    open={true}
                    autoHideDuration={autoHideDuration}
                    onClose={() => {
                        if (alert.id) {
                            dispatch(removeAlert(alert.id));
                        }
                    }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity={alert.type}
                        action={
                            <Button color="inherit" size="small" onClick={() => {
                                if (alert.id) {
                                    dispatch(removeAlert(alert.id));
                                }
                            }}>
                                Fechar
                            </Button>
                        }
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    );
};

export default SnackbarAlert;
