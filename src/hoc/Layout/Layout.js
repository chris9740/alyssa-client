import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Container from "react-bootstrap/Container";
import classes from "./Layout.module.css";

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <Header />
                <Container className={classes.Content}>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}

export default Layout;