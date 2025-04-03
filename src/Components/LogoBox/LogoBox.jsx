import { Box, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'mui-image';

import LogoImage from "./images/logo_flower.png";

const useStyle = makeStyles((theme) => ({

    topBoxStand: {
        minHeight: "200px",
        height: "25%",
        maxHeight: "450px"
    },
    topBoxSmall: {
        height: "195px",
    }
}));

const LogoBox = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const classes = useStyle();
    return (
        <Box className={isMobile ? classes.topBoxSmall : classes.topBoxStand}>
            <Image
                src={LogoImage}
                fit='contain'
                duration={500}>

            </Image>
        </Box>
    );
}

export default LogoBox;