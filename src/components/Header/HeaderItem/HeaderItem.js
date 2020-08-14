import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderItem.module.css";

const headerItem = (props) => {
    return (
        <Link
            {...props}
            to={props.link}
            className={classes.HeaderItem}>{props.children}</Link>
    )
}

export default headerItem;