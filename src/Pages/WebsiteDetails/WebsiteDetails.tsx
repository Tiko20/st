import React, { FC, SyntheticEvent, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Divider, Tab, ThemeProvider } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Height, Star, Workspaces } from '@mui/icons-material'
import PartnerInfoFrame from '../../Components/PartnerInfoFrame/PartnerInfoFrame'
import { TabsTheme } from '../../Themes/Themes'

enum Tabs {
    General = "general",
    ProvidersSetup = "providersSetup"
}

const WebsiteDetails: FC = () => {
    const params = useParams()
    // console.log(typeof params.tabs)
    const [value, setValue] = useState<string>(params.tabs || "");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box component={"div"}>
                <TabContext value={value} >
                    <Box>
                        <ThemeProvider theme={TabsTheme}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ minHeight: "24px", }} TabIndicatorProps={{
                                style: {
                                    backgroundColor: "tranparent"
                                },
                            }}
                            >
                                <Tab
                                    icon={<Star />} iconPosition="start"
                                    label="general"
                                    component={Link}
                                    to={`/${params.id}/${Tabs.General}`}
                                    value={Tabs.General}
                                    sx={{ marginRight: "3px" }}
                                />
                                <Tab
                                    icon={<Workspaces />} iconPosition="start"
                                    label="Providers setup"
                                    component={Link}
                                    to={`/${params.id}/${Tabs.ProvidersSetup}`}
                                    value={Tabs.ProvidersSetup}

                                />
                            </TabList>
                            <Divider sx={{ height: "4px", background: "#5048E5", borderRadius: "0px 8px 0 0" }} />
                        </ThemeProvider>
                    </Box>
                    <TabPanel value={Tabs.General}>
                        < PartnerInfoFrame key={params.id} />
                    </TabPanel>
                    <TabPanel value={Tabs.ProvidersSetup}>Item Two</TabPanel>
                </TabContext >
            </Box >
        </>
    )
}

export default WebsiteDetails

// https://www.npmjs.com/package/react-tabs