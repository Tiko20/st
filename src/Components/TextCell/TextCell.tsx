import { ContentCopy } from '@mui/icons-material';
import { IconButton, Grid, Typography } from '@mui/material';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';

type Props = {
    title: string,
    body: string
};

const TextCell: FC<Props> = ({ title, body }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const lengthText = 30;

    const handleCopyContent = (key: string) => {
        navigator.clipboard.writeText(key) // copy secret key
    };

    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth)
        }
    }, [])

    return (
        <Grid item xs={3}>
            <Typography variant='body1' sx={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "12px" }} component={"p"}>
                {title}
            </Typography>
            <Typography variant='body1' ref={ref} sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {body}
                {title === "Secret Key" && ( // if the body is equal add copy button
                    <IconButton onClick={() => handleCopyContent(body)}>
                        <ContentCopy />
                    </IconButton>
                )}
            </Typography>
        </Grid>
    );
};

export default TextCell;
