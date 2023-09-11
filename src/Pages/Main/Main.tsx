import React from 'react'
import Table from '../../Components/Table/Table'
import CreatePartner from '../../Components/CreatePartner/CreatePartner'
import TableHeader from '../../Components/TableHeader/TableHeader'
import CustomAppBar from '../../Components/AppBar/CustomAppBar'
import { Box, Container } from '@mui/material'
import { Outlet } from "react-router-dom"



type Props = {}

const Main = (props: Props) => {
    return (
        <>
            <Box sx={{ backgroundColor: "#F9FAFC" }}>
                <CustomAppBar />
                <Container maxWidth="xl" sx={{ backgroundColor: "white" }}>
                    <TableHeader />
                    <Table />
                </Container>
            </Box>
            {/* <Outlet /> */}
            {/* Why? */}
        </>
    )
}

export default Main