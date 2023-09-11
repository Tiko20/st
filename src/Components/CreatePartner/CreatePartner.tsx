import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, TextField, ThemeProvider } from '@mui/material';
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { myTheme } from '../../Themes/Themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPartner } from '../../Api/Api';
import { GET_DATA_PARTNER } from '../../Keys/Keys';
import { schema } from '../../Schema/SchemaPartner';
import { enqueueSnackbar } from 'notistack';
import { Partner } from '../../Interfaces/CreatePartner';


interface Props {
    onClose: () => void
}

const CreatePartner: FC<Props> = ({ onClose }) => {
    const queryClient = useQueryClient();

    const creatPartnerForm = useMutation(createPartner, {
        onSuccess(data, variables, context) {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: [GET_DATA_PARTNER] });
            enqueueSnackbar(' the partner created successfully', {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                variant: 'success',
                autoHideDuration: 1000
            })
            onClose();
        },
        onError(error, variables, context) {
            console.log(error)
        },
    })


    const createPartnerForm = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Partner> = (data) => {
        creatPartnerForm.mutate(data)
    }


    return (
        <div style={{ width: "600px" }}>
            <Dialog
                open={true}
            >
                <DialogTitle>
                    <b>Create Partner</b>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: "absolute", top: 10, right: 10 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <form className='create-partner-form' onSubmit={createPartnerForm.handleSubmit(onSubmit)}>
                    <DialogContent
                        sx={{ borderTop: "1px solid gray", borderBottom: "1px solid gray" }}
                    >
                        <ThemeProvider theme={myTheme}>
                            <TextField
                                sx={{ marginBottom: 2 }}
                                {...createPartnerForm.register("name", { required: true })}
                                label="Company Name"
                                placeholder='Company Name'
                                fullWidth
                                size='small'
                                variant="outlined"
                                error={!!createPartnerForm.formState.errors.name}
                                helperText={createPartnerForm.formState.errors.name?.message}
                                className='textfiled'
                            />
                            <TextField
                                sx={{ marginBottom: 2 }}
                                {...createPartnerForm.register("personName", { required: true })}
                                id="personName"
                                label="Person Name"
                                placeholder='Person Name'
                                fullWidth
                                variant="outlined"
                                size='small'
                                error={!!createPartnerForm.formState.errors.personName}
                                helperText={createPartnerForm.formState.errors.personName?.message}

                            />
                            <TextField
                                sx={{ marginBottom: 2 }}
                                {...createPartnerForm.register("email", { required: true })}
                                id="email"
                                label="Contact Information"
                                placeholder='Conact Informationь'
                                type="email"
                                fullWidth
                                variant="outlined"
                                size='small'
                                error={!!createPartnerForm.formState.errors.email}
                                helperText={createPartnerForm.formState.errors.email?.message}
                            />

                        </ThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <ThemeProvider theme={myTheme}>
                            <Button type='reset' onClick={onClose} sx={{ borderRadius: "100px" }}>Cancel</Button>
                            <Button type="submit" variant='contained' sx={{ borderRadius: "100px" }}>Create</Button>
                        </ThemeProvider>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
}

export default CreatePartner