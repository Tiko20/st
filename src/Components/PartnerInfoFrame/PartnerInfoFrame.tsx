import { Box, Divider, Grid, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_DATA_PARTNER_IND } from '../../Keys/Keys'
import { GetPersonsDataInd } from '../../Api/Api'
import { useQuery } from '@tanstack/react-query'
import TextCell from '../TextCell/TextCell'

interface Partner {
    id: number,
    email: string,
    name: string,
    creationDate: string,
    personName: string,
    status: string
}



const PartnerInfoFrame = () => {
    const params = useParams()
    const targetCountries = " Los Angeles County, CA. This postal code encompasses addresses in the city of Los Angeles, CA."
    const currencies = "When you send or receive an international transfer with your bank, you might lose money on a bad exchange rate and pay hidden fees as a result."
    const navigator = useNavigate()
    const partnerData = useQuery({
        queryKey: [GET_DATA_PARTNER_IND, params.id],
        queryFn: () => GetPersonsDataInd(params.id!)
    })
    return (
        <>
            <Box>
                <Grid container mb={1}>
                    <Grid>
                        <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                            GENERAL DETAILS
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography sx={{ fontSize: "14px", textTransform: "capitalize", color: partnerData.data?.data.status === "active" ? "#2BB366" : "#CA304A" }}>
                            {partnerData.data?.data.status}
                        </Typography> 
                    </Grid>
                </Grid>
                <Divider variant='fullWidth' sx={{ marginBottom: 1 }} />
                <Grid container spacing={1} >
                    <TextCell title='Name' body={partnerData.data?.data.name} />
                    <TextCell title='Platform' body="Platform name" />
                    <TextCell title='Partner' body="Partner name" />
                    <TextCell title='Target Countries' body={targetCountries} />
                    <TextCell title='Currencies' body={currencies} />
                    <TextCell title='Secret Key' body={partnerData.data?.data.id} />
                </Grid>
            </Box >
        </>
    )
}

export default PartnerInfoFrame