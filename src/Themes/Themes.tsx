import { createTheme } from "@mui/material";

export const myTheme = createTheme({
    palette: {
        primary: {
            main: '#5048E5',
            light: "#001EB2",
            contrastText: '#ffffff',
        },
        warning: {
            main: "#ED6C02"
        },
        error: {
            main: "#CA304A"
        },
        success: {
            main: '#2BB366'
        }
    },
});

export const chipsTheme = createTheme({
    components: {
        MuiChip: {
            variants: [
                {
                    props: { variant: "filled" },
                    style: {
                        borderWidth: 2, // Change the border width as needed
                        borderColor: 'currentColor', // Change the border color as needed

                    },
                },
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: 'lightgray', // Change the background color as needed
                        color: "error"
                    },
                },
                // Add more variants and styles as needed
            ],
        },
    },
});

export const TabsTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            contrastText: 'white',
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: "white",
                        backgroundColor: "#5048E5",
                        borderColor: "transparent"
                    },
                    backgroundColor: "white",
                    minHeight: "24px",
                    color: "#757575",
                    border: "1px solid #757575",
                    borderRadius: "8px 8px 0px 0px",
                    boxShadow: "0px 4px 6px 0px rgba(100, 116, 139, 0.12), 0px 2px 4px 0px rgba(31, 41, 55, 0.06)",

                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "transparent"
                }
            }
        }
    }
});






