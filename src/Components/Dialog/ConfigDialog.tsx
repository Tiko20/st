import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ThemeProvider } from '@mui/material';
import { Close } from "@mui/icons-material"
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chahgePersonStatus } from "../../Api/Api"
import { GET_DATA_PARTNER } from '../../Keys/Keys';
import { GridRowId } from '@mui/x-data-grid';
import { myTheme } from '../../Themes/Themes';
import { MyButtonContrast, MyButtonMain } from '../../MyCustumStyles/Buttons';

interface Props {
    onClose: () => void,
    status: boolean,
    id: GridRowId,
    dialogConfirm: () => void
}

const ConfigDialog: FC<Props> = ({ onClose, status, id, dialogConfirm }) => {
    const queryClinet = useQueryClient();

    const requestStatus = useMutation(chahgePersonStatus, {
        onSuccess: (data) => {
            queryClinet.invalidateQueries({ queryKey: [GET_DATA_PARTNER] })
            dialogConfirm();
        },
        onError: (data) => {
            console.log(data)
        }
    });

    const onSubmit = ({ id, status }: { id: GridRowId, status: boolean }) => {

        requestStatus.mutate({ id, status })
    }

    return (
        <div>
            <Dialog
                open={true}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"  >

                <DialogTitle id="alert-dialog-title">
                    <b>Confirmation</b>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: "absolute", top: 10, right: 10 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: 0 }}>
                    <DialogContentText id="alert-dialog-description" sx={{ padding: "16px" }} color={"black"}>
                        {status ? (
                            <>
                                Are you sure you want to <b>activate</b> the partner?
                            </>

                        ) : (
                            <>
                                Are you sure you want to <b>deactivate</b> the partner?
                            </>
                        )}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MyButtonContrast onClick={onClose} variant="text">CANCEL</MyButtonContrast>
                    <ThemeProvider theme={myTheme}>
                        <MyButtonMain onClick={() => onSubmit({ id, status })} autoFocus variant="contained">
                            CONFIRM
                        </MyButtonMain>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfigDialog;

