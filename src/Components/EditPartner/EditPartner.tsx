import { Close } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { myTheme } from '../../Themes/Themes'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from '../../Schema/SchemaPartner';
import { GridRowParams } from '@mui/x-data-grid'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editePartner } from '../../Api/Api'
import { GET_DATA_PARTNER } from '../../Keys/Keys'
import { MyButtonContrast, MyButtonMain } from '../../MyCustumStyles/Buttons'
type Props = {
    onClose: () => void,
    params: GridRowParams | undefined,
}

interface EditPartner {
    name: string,
    personName: string,
    email: string
}

const EditPartner: FC<Props> = ({ onClose, params }) => {

    const queryClient = useQueryClient();

    const editPartner = useMutation(editePartner, {
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({ queryKey: [GET_DATA_PARTNER] });
            onClose();
        },
        onError(error, variables, context) {
            console.log(error)
        },
    })

    const editPartnerForm = useForm({
        resolver: yupResolver(schema)
    });

    const onSave: SubmitHandler<EditPartner> = (data) => {
        editPartner.mutate({ ...data, id: params?.row.id })

    }

    return (
        <div>
            <Dialog
                open={true}
            >
                <DialogTitle>
                    <b>Edit Partner</b>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: "absolute", top: 10, right: 10 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <form className='edit-partner-form' onSubmit={editPartnerForm.handleSubmit(onSave)}>
                    <DialogContent
                        sx={{ borderTop: "1px solid gray", borderBottom: "1px solid gray" }}
                    >
                        <ThemeProvider theme={myTheme}>
                            <TextField
                                sx={{ marginBottom: 2 }}
                                {...editPartnerForm.register("name", { required: true })}
                                label="Company Name"
                                placeholder='Company Name'
                                fullWidth
                                size='small'
                                variant="outlined"
                                error={!!editPartnerForm.formState.errors.name}
                                helperText={editPartnerForm.formState.errors.name?.message}
                                className='textfiled'
                                defaultValue={params?.row.name}
                            />
                            <TextField
                                sx={{ marginBottom: 2 }}
                                {...editPartnerForm.register("personName", { required: true })}
                                id="personName"
                                label="Person Name"
                                placeholder='Person Name'
                                fullWidth
                                variant="outlined"
                                size='small'
                                error={!!editPartnerForm.formState.errors.personName}
                                helperText={editPartnerForm.formState.errors.personName?.message}
                                defaultValue={params?.row.personName}

                            />
                            <TextField
                                {...editPartnerForm.register("email", { required: true })}
                                id="email"
                                label="Contact Information"
                                placeholder='Conact Informationь'
                                type="email"
                                fullWidth
                                variant="outlined"
                                size='small'
                                error={!!editPartnerForm.formState.errors.email}
                                helperText={editPartnerForm.formState.errors.email?.message}
                                defaultValue={params?.row.email}
                            />
                        </ThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <ThemeProvider theme={myTheme}>
                            <MyButtonContrast type='reset' onClick={onClose}>Cancel</MyButtonContrast>
                            <MyButtonMain type="submit" variant='contained'>Save</MyButtonMain>
                        </ThemeProvider>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    )
}

export default EditPartner