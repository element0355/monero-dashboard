import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';
import XcashContainer from './components/XcashContainer/XcashContainer';

function App() {
    return (
        <Container className="app">
            <XcashContainer />
            <Footer></Footer>
        </Container>
    );
}

export default App;
