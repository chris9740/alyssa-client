import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import classes from "./Commands.module.css";

class Commands extends Component {
    state = {
        commands: [],
        categories: [],
        error: null,
        selectedCategory: null
    }

    componentDidMount() {
        axios.get("/commands").then((response) => {
            const categories = response.data.reduce((reduced, command) => {
                if (reduced.indexOf(command.category) === -1) {
                    reduced.push(command.category);
                }

                return reduced;
            }, []);

            this.setState({
                commands: response.data,
                categories: categories
            });
        }).catch((error) => {
            this.setState({
                error: "Unable to load commands."
            });
        });
    }

    selectCategoryHandler(category) {
        console.log(category);
    }

    render() {
        let commands = <Spinner />

        if (this.state.error) {
            commands = <h3>{this.state.error}</h3>
        } else if (this.state.commands.length) {
            commands = (
                <Route path={["/commands/:category", "/commands"]} render={(props) => {
                    const selectedCategory = props.match.params.category || this.state.categories[0];
                    const categoryCommands = this.state.commands.filter((command) => command.category === selectedCategory);

                    if (!categoryCommands.length) {
                        return <Redirect to="/commands" />;
                    }

                    const commandsList = categoryCommands.map((categoryCommand) => {
                        return (
                            <Row className={classes.ListRow} key={categoryCommand.command}>
                                <Col sm={2} className={classes.Command} key={"command" + categoryCommand.command}>
                                    {categoryCommand.command}
                                </Col>
                                <Col sm={5} key={"description" + categoryCommand.command}>
                                    {categoryCommand.description}
                                </Col>
                                <Col sm={5} key={"usage" + categoryCommand.command}>
                                    {categoryCommand.usage}
                                </Col>
                            </Row>
                        )
                    });

                    return (
                        <Row>
                            <Col sm={3}>
                                <ListGroup className={classes.ListGroup}>
                                    {this.state.categories.map((category) => {
                                        const linkClasses = [classes.ListGroupItemText];

                                        if (category === selectedCategory) {
                                            linkClasses.push(classes.ListGroupItemActive);
                                        }

                                        return (
                                            <ListGroup.Item
                                                className={classes.ListGroupItem}
                                                key={category}>
                                                <Link
                                                    className={linkClasses.join(" ")}
                                                    to={"/commands/" + category}
                                                    onClick={() => this.selectCategoryHandler(category)}>
                                                    {category}
                                                </Link>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </Col>
                            <Col sm={9} className={classes.CommandList}>
                                <Row className={classes.ListHeader}>
                                    <Col sm={2}>
                                        Command
                                    </Col>
                                    <Col sm={5}>
                                        Description
                                    </Col>
                                    <Col sm={5}>
                                        Usage
                                    </Col>
                                </Row>
                                {commandsList}
                            </Col>
                        </Row>
                    );
                }} />
            )
        }

        return (
            <div style={{ flex: "auto" }}>
                {commands}
            </div>
        )
    }
}

export default Commands;
