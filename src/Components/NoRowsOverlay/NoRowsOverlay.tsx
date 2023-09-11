import { SentimentDissatisfied } from "@mui/icons-material";
import { Typography } from "@mui/material"; // Note: Use createTheme from @mui/material
import NotDataFile from "../../Images/Group 19.svg";

const EmptyDataOverlay = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            textAlign: 'center',
        }}>
            <div>
                <img src={NotDataFile} alt="no data" style={{ width: "100px", height: '100px' }} />
            </div>
            <Typography variant="subtitle1" sx={{ color: "#0000004D" }}>No Data</Typography>
        </div>
    );
};

export default EmptyDataOverlay;
