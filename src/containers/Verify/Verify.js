import React, { Component } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import classes from "./Verify.module.css";

class Verify extends Component {
    state = {
        captcha: null,
        error: null
    }

    componentDidMount() {
        axios.get("/captchas/" + this.props.match.params.token)
            .then((response) => {
                const { captcha } = response.data;

                this.setState({ captcha });
            })
            .catch((error) => {
                if(!error.response) {
                    this.setState({
                        error: "Something went wrong"
                    })
                } else if(error.response.status === 404) {
                    this.setState({
                        error: "Captcha not found"
                    });
                } else {
                    this.setState({
                        error: "Something went wrong"
                    });
                }
            });
    }

    verificationSuccessHandler = function(token) {
        axios.post("/captchas/" + this.props.match.params.token, { token })
            .then((response) => {
                const data = response.data;

                console.log(data);
            })
            .catch((error) => {
                if(!error.response) {
                    this.setState({
                        error: "Something went wrong"
                    });
                } else {
                    if(error.response.status === 400) {
                        this.setState({
                            error: "Unable to complete captcha. Please refresh the page and try again"
                        });
                    } else if(error.response.status === 500) {
                        this.setState({
                            error: "Internal server error"
                        });
                    } else {
                        this.setState({
                            error: "Something went wrong"
                        });
                    }
                }
            });
    }

    render() {
        let captcha = <Spinner />

        if(this.state.error) {
            captcha = <h3>{this.state.error}</h3>
        } else if(this.state.captcha) {
            captcha = (
                <Aux>
                    <p>Please complete the captcha below to get access to {this.state.captcha.guildName}</p>
                    <HCaptcha
                        sitekey="2295795c-6476-40da-a517-a088d46d2000"
                        onVerify={(token) => this.verificationSuccessHandler(token)} />
                </Aux>
            )
        }

        return (
            <div className={classes.Captcha}>
                {captcha}
            </div>
        )
    }
}

export default Verify;