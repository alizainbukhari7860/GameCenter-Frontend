import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";
import logo from "../Images/logo.svg";
import facebook from "../Images/facebook.png";
import google from "../Images/google.jpg";
import signinImage from "../Images/signinImage.png";
import signupImage from "../Images/signupImage.png";
import guestImage from "../Images/guestImage.png";
import illustration from "../Images/illustration.svg";
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";
import "../index.css";

class LandingScreen extends Component {
  state = {
    userEmail: "",
    userPassword: "",
    newUserEmail: "",
    newUserPassword: "",
    nick: "",
    room: "",
    isLoading: true,
    token: "",
  };

  // componentDidMount() {
  //   const token = getFromStorage("the_main_app");
  //   if (token) {
  //     fetch("/api/account/verify?token=" + token).then((res) =>
  //       res.json().then((json) => {
  //         if (json.success) {
  //           this.setState({ token, isLoading: false });
  //         } else {
  //           this.setState({ isLoading: false });
  //         }
  //       })
  //     );
  //   } else {
  //     this.setState({ isLoading: false });
  //   }
  // }

  guest = () => {
    this.setState({
      isLoading: true,
    });

    axios
      .post(
        "http://ec2-52-66-210-84.ap-south-1.compute.amazonaws.com/api/account/room",
        {
          nick: this.state.nick,
          room: this.state.room,
        }
      )
      .then(
        this.props.history.push("/GameRoom", {
          nick: this.state.nick,
          room: this.state.room,
        })
      )
      .then(console.log(this.state));
  };

  signup = () => {
    this.setState({
      isLoading: true,
    });

    axios
      .post(
        "http://ec2-52-66-210-84.ap-south-1.compute.amazonaws.com/api/account/signup",
        {
          email: this.state.newUserEmail,
          password: this.state.newUserPassword,
        }
      )
      .then(
        this.props.history.push("/Accounts", {
          Email: this.state.newUserEmail,
          Password: this.state.newUserPassword,
        })
      );
  };

  signin = () => {
    this.setState({
      isLoading: true,
    });

    axios
      .post(
        "http://ec2-52-66-210-84.ap-south-1.compute.amazonaws.com/api/account/signin",
        {
          email: this.state.userEmail,
          password: this.state.userPassword,
        }
      )
      .then((json) => {
        if (json.data.success) {
          // console.log(json.data.message);
          this.setState({
            token: json.token,
          });
          this.props.history.push("/Lobby", {
            Email: this.state.userEmail,
            Password: this.state.userPassword,
          });
        } else {
          alert("Invalid Email or Password");
          console.log({ json });
        }
      });

    //   fetch("/api/account/signin", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       // email: signInEmail,
    //       // password: signInPassword,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((json) => {
    //       console.log("json", json);
    //     });
  };

  validate() {
    let input = this.state.input;
    let email = this.state.userEmail;
    let newEmail = this.state.newUserEmail;
    let errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    if (!newEmail) {
      isValid = false;
      errors["newEmail"] = "Please enter your Email Address.";
    }

    if (typeof newEmail !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(newEmail)) {
        isValid = false;
        errors["newEmail"] = "Please enter valid Email address.";
      }
    }
    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <Container fluid>
        <Navbar
          style={{ zIndex: 9, backgroundColor: "#FFFFFF" }}
          expand="lg"
          variant="light"
          className="ml-10 sticky-top"
        >
          <Navbar.Brand href="#">
            <Image style={{ width: "100%" }} src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link href="#guest" className="mx-5 bold">
                  PLAY AS A GUEST
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#signup" className="mx-5 bold">
                  SIGN UP, IT'S FREE
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button
                  style={{
                    backgroundColor: "#F9F1BE",
                    borderColor: "transparent",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  className="mx-5 px-5 "
                  href="#signin"
                >
                  SIGN IN
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <hr />
        <div>
          <h1 className="center heading">Playtime with friends and family</h1>
          <div className="background">
            <Image src={illustration} style={{ width: "100%" }} />
          </div>
          <p className="center steps">
            You can now video conference and play with your friends and family
            in 3 simple steps:
          </p>
        </div>

        <Container>
          <Row className="mb-5 pb-5">
            <Col md>
              <Button
                style={{
                  backgroundColor: "#a6d8de",
                  borderColor: "transparent",
                  borderRadius: "50%",
                  color: "black",
                  fontWeight: "bold",
                }}
                className="mr-3"
              >
                1
              </Button>
              <span className="steps">
                Sign in / Sign up and setup a play room.
              </span>
            </Col>
            <Col md>
              <Button
                style={{
                  backgroundColor: "#a6d8de",
                  borderColor: "transparent",
                  borderRadius: "50%",
                  color: "black",
                  fontWeight: "bold",
                }}
                className="mr-3"
              >
                2
              </Button>
              <span className="steps">
                Share the link & room name with your players.
              </span>
            </Col>
            <Col md>
              <Button
                style={{
                  backgroundColor: "#a6d8de",
                  borderColor: "transparent",
                  borderRadius: "50%",
                  color: "black",
                  fontWeight: "bold",
                }}
                className="mr-3"
              >
                3
              </Button>
              <span className="steps">Click on Start Game. </span>
            </Col>
          </Row>
        </Container>

        <div className="SIGN-IN signinBack mt-5 pt-5 pb-5" id="signin">
          <div className="py-5">
            <p className="center heading">Sign in</p>
          </div>
          <Row>
            <Col className="d-flex align-items-md-end align-items-center flex-column">
              <div className="center">
                <p className="signinSpan">
                  Sign in to start playing and invite your friends and family to
                  games.
                </p>
                <div>
                  <FacebookLogin
                    appId="672799816760557"
                    fields="name,email"
                    callback={(response) => {
                      this.setState({
                        SocialName: response.name,
                        SocialEmail: response.email,
                      });
                      this.props.history.push("/Lobby", {
                        Email: this.state.SocialEmail,
                        Password: this.state.SocialName,
                      });
                    }}
                    render={(renderProps) => (
                      <button
                        className="socialLogin my-3"
                        onClick={renderProps.onClick}
                      >
                        <Image
                          src={facebook}
                          style={{ width: 30 }}
                          className="mr-3"
                        />
                        Sign in With Facebook
                      </button>
                    )}
                  />
                </div>
                <div>
                  <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    callback={() => {
                      this.props.history.push("/Lobby");
                    }}
                    render={(renderProps) => (
                      <button
                        className="socialLogin"
                        onClick={renderProps.onClick}
                      >
                        <Image
                          src={google}
                          style={{ width: 30 }}
                          className="mr-3"
                        />
                        Sign in With Google
                      </button>
                    )}
                    buttonText="Login"
                    // onSuccess={this.responseGoogle}
                    // onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="my-3">OR</div>
                <Form>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    style={{ width: 245 }}
                    className="mx-auto"
                    id="userEmail"
                    value={this.state.userEmail}
                    onChange={(event) => {
                      event.target.value.length < 65 &&
                        this.setState(
                          { userEmail: event.target.value },
                          this.validate
                        );
                    }}
                  />
                  <div className="text-danger mb-3">
                    {this.state.errors?.email}
                  </div>

                  <Form.Control
                    type="password"
                    value={this.state.userPassword}
                    placeholder="Enter password"
                    style={{ width: 245 }}
                    className="mx-auto"
                    id="userPassword"
                    onChange={(event) => {
                      event.target.value.length < 65 &&
                        this.setState({ userPassword: event.target.value });
                    }}
                  />
                  <Button variant="link">
                    <span className="forgetButton">Forgot Password?</span>
                  </Button>
                  <br />
                  <button
                    type="button"
                    className="yellowButton py-1 px-5 mt-4"
                    onClick={this.signin}
                    disabled={
                      !this.state.userEmail ||
                      this.state.userEmail === "" ||
                      this.state.userPassword === "" ||
                      !this.state.userEmail
                    }
                    disabled={!this.state.userEmail && !this.state.userPassword}
                  >
                    Sign in
                  </button>
                </Form>
              </div>
            </Col>
            <Col sm={12} md={6} className="ml-md-5 pl-md-5 w-100">
              <Image src={signinImage} className="w-100" />
            </Col>
          </Row>
        </div>

        <div className="SIGN-UP signinBack mt-5 pt-5 pb-5" id="signup">
          <div className="py-5">
            <h1 className="center">Sign up, It’s free!</h1>
          </div>
          <Row>
            <Col sm={12} md={6} className="ml-md-5 pl-md-5 w-100">
              <Image src={signupImage} className="w-100" />
            </Col>
            <Col>
              <div className="center">
                <p className="signinSpan">Dont have an account? Sign up now.</p>
                <div>
                  <FacebookLogin
                    appId="672799816760557"
                    fields="name,email"
                    callback={(response) => {
                      this.setState({
                        SocialName: response.name,
                        SocialEmail: response.email,
                      });
                      this.props.history.push("/Accounts", {
                        Email: this.state.SocialEmail,
                        Password: this.state.SocialName,
                      });
                    }}
                    render={(renderProps) => (
                      <button
                        className="socialLogin my-3"
                        onClick={renderProps.onClick}
                      >
                        <Image
                          src={facebook}
                          style={{ width: 30 }}
                          className="mr-3"
                        />
                        Sign up With Facebook
                      </button>
                    )}
                  />
                </div>
                <div>
                  <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    callback={() => {
                      this.props.history.push("/Accounts");
                    }}
                    render={(renderProps) => (
                      <button
                        className="socialLogin"
                        onClick={renderProps.onClick}
                      >
                        <Image
                          src={google}
                          style={{ width: 30 }}
                          className="mr-3"
                        />
                        Sign up With Google
                      </button>
                    )}
                    buttonText="Login"
                    // onSuccess={this.responseGoogle}
                    // onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="my-3">OR</div>
                <Form>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    style={{ width: 245 }}
                    className="mx-auto"
                    value={this.state.newUserEmail}
                    onChange={(event) => {
                      event.target.value.length < 65 &&
                        this.setState(
                          { newUserEmail: event.target.value },
                          this.validate
                        );
                    }}
                  />
                  <div className="text-danger mb-3">
                    {this.state.errors?.newEmail}
                  </div>
                  <Form.Control
                    type="password"
                    value={this.state.newUserPassword}
                    placeholder="Enter password"
                    style={{ width: 245 }}
                    className="mx-auto"
                    id="newUserPassword"
                    onChange={(event) => {
                      event.target.value.length < 65 &&
                        this.setState({ newUserPassword: event.target.value });
                    }}
                  />
                  <br />
                  <button
                    disabled={
                      !this.state.newUserEmail ||
                      this.state.newUserEmail === "" ||
                      this.state.newUserPassword === "" ||
                      !this.state.newUserEmail
                    }
                    type="button"
                    className="yellowButton py-1 px-5 mt-4"
                    onClick={this.signup}
                  >
                    Sign up
                  </button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>

        <div className="GUEST signinBack mt-5 pt-5 pb-5" id="guest">
          <div className="py-5">
            <h1 className="center"> Play as an invited guest</h1>
          </div>
          <Row>
            <Col sm={12} md={6} className="ml-md-5 pl-md-5 w-100">
              <Image src={guestImage} className="w-100" />
            </Col>
            <Col>
              <div className="center ">
                <Form>
                  <Form.Control
                    type="text"
                    placeholder="Enter your nick name"
                    style={{ width: 245 }}
                    className="mb-3 mt-5 mx-auto"
                    value={this.state.nick}
                    onChange={(event) => {
                      event.target.value.length < 65 &&
                        this.setState({ nick: event.target.value });
                    }}
                  />
                  <Form.Control
                    type="text"
                    value={this.state.room}
                    placeholder="Enter room name"
                    style={{ width: 245 }}
                    className="mx-auto"
                    onChange={(event) => {
                      event.target.value.length < 65 &&
                        this.setState({ room: event.target.value });
                    }}
                  />

                  <br />
                  <button
                    type="button"
                    className="yellowButton py-1 px-5 mt-4"
                    onClick={this.guest}
                    disabled={
                      !this.state.room ||
                      this.state.room === "" ||
                      this.state.nick === "" ||
                      !this.state.nick
                    }
                  >
                    Enter Game Room
                  </button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>

        <div className="center mt-5 pt-5 " id="footer">
          <Row>
            <Col></Col>
            <Col md>
              <div>
                <span className="footer">
                  About Us | Your Account | Privacy Policy | Support
                </span>
              </div>
              <div>
                <span className="subFooter">
                  © 2020 Game Center | All Rights Reserved
                </span>
              </div>
            </Col>
            <Col md className="mt-2">
              <div>
                <FaInstagram className="mx-3" size="2em" />
                <FaFacebookF className="mx-3" size="2em" />
                <FaTwitter className="mx-3" size="2em" />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default withRouter(LandingScreen);
