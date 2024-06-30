// src/App.js

import { Box, Container, useMediaQuery } from '@mui/material';

import LogoBox from './Components/LogoBox/LogoBox';
import RASearchBox from './Components/SearchBox/RASearchBox';
import RABookmarks from './Components/Bookmarks/RABookmarks';
import { makeStyles } from '@mui/styles';


const useStyle = makeStyles((theme)=>({
    app:{
        textAlign:"center",
    },
}));

function App() {

    const isMobile = useMediaQuery('(max-width:600px)');
    const classes = useStyle();
    return (
        <Container className='App' maxWidth="lg" style={{ marginTop: '20px',height: '100vh' }}>
            <LogoBox></LogoBox>
            <RASearchBox></RASearchBox>
            <RABookmarks></RABookmarks>
        </Container>
    );
}

export default App;
