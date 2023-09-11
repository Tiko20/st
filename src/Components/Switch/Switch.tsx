import React, { FC, useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { GridRowId } from '@mui/x-data-grid';
import ConfigDialog from '../Dialog/ConfigDialog';

type Props = {
    id: GridRowId
    value: boolean
}

const StatusSwitch = ({ id, value }: Props) => {
    const [newValue, setNewValue] = useState(value)
    const [isOpen, setOpen] = useState(false)

    const handleSwitch = () => { // change status until request goes to server
        setNewValue(!newValue)
        setOpen(true)
    }

    const handleDialogClose = () => {
        setNewValue(value)
        setOpen(false)
    }

    const handleDialogConfirm = () => {
        setOpen(false)
    }


    return (
        <>
            <Switch
                checked={newValue}
                value={newValue}
                color='success'
                onChange={handleSwitch}
            />
            {isOpen && <ConfigDialog onClose={handleDialogClose} dialogConfirm={handleDialogConfirm} status={newValue} id={id} />}
        </>

    )
}

export default StatusSwitch