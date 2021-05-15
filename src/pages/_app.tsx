import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { sensorListView } from "../constants/paths";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

// import App from 'next/app'

// @ts-ignore
function MyApp({ Component, pageProps }) {
    return (
        <Container>
            <Navbar>
                <Navbar.Brand href={sensorListView}>
                    Pi Sensor Site
                </Navbar.Brand>
            </Navbar>
            <Component {...pageProps} />
        </Container>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
