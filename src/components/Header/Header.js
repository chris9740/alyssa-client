import React from "react";
import HeaderItem from "./HeaderItem/HeaderItem";
import Button from "react-bootstrap/Button";
import classes from "./Header.module.css";

const header = () => (
    <header className={classes.Header}>
        <section className={classes.Left}>
            <HeaderItem link="/">
                <h1 className={classes.Logo}>Alyssa</h1>
            </HeaderItem>
            <HeaderItem link="/">Home</HeaderItem>
            <HeaderItem link="/commands">Commands</HeaderItem>
        </section>
        <section className={classes.Right}>
            <HeaderItem link="/discord" target="_blank">
                <Button variant="danger" className={classes.JoinButton}>JOIN SERVER</Button>
            </HeaderItem>
        </section>
    </header>
);

export default header;