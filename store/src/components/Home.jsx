import React, { useEffect, useState } from "react";
import { TextField, Typography, Button } from '@mui/material';
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import "../Css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const salt = bcrypt.genSaltSync(10);

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logButton, setLogButton] = useState(false);
    const [status, setStatus] = useState("");

    const hashedPassword = bcrypt.hashSync(password, salt);
    // const [profile, setProfile] = useState("");
    // const [error, setError] = useState("");

    const register = () => {
        if (email === "" || password === "") {
            // alert("Fields are required");
            toast.error("All Fields are required", {
                position: "top-right"
            });
            return;
        }
        const sendGetRequest = async () => {
            try {
                const data = await Axios.get(`https://storebackend-jeri.onrender.com/${email}`)
                    .then(response => {
                        // console.log(response);
                        if (response.data.user.length > 0) {
                            setStatus("User Already Present with that Name : " + email);
                        } else {
                            Axios.post("https://storebackend-jeri.onrender.com/",
                                {
                                    username: email,
                                    password: hashedPassword
                                }).then(response => {
                                    // console.log(response);
                                    toast.success("User signed in", {
                                        position: "top-right"
                                    });
                                    // alert();
                                    // login(true);
                                    navigate('/books');
                                });
                        }
                    })
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest();


    };

    const logged = () => {
        if (email === "" || password === "") {
            // alert("All Fields are required");
            toast.error("All Fields are required", {
                position: "top-right"
            });
            return;
        } else {
            Axios.get(`https://storebackend-jeri.onrender.com/${email}`,
                {
                    username: email,
                    password: hashedPassword
                }).then(response => {
                    // console.log(response);
                    if (response.data.user.length === 0) {
                        setStatus("No User present with Name : " + email);
                    } else {
                        // setUsername(response.data[0].Username);

                        // console.log(response.data.user[0].password);
                        bcrypt.compare(password, response.data.user[0].password, function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                            if (res) {
                                // alert("User signed in");
                                toast.success("User signed in", {
                                    position: "top-right"
                                });
                                // login(true);
                                navigate('/books');
                            } else {
                                // alert("Unable to signed in");
                                toast.error("Unable to signed in", {
                                    position: "top-right"
                                });
                                setStatus("Incorrect Username / Password ");
                                return response.json({ success: false, message: 'passwords do not match' });
                            }
                        });
                        // setStatus(response.data[0].Username);
                    }

                });
        }

    };

    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: "400821186589-u1vait71482la17hds6048bh3ivr4r89.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load('client: auth2', start)
    }, [])
    const onSuccess = e => {
        // alert("User signed in");
        toast.success("User signed in", {
            position: "top-right"
        });
        Axios.post("https://storebackend-jeri.onrender.com/",
            {
                username: e.profileObj.name,
                password: e.profileObj.name
            }).then(response => {
                // login(true);
                navigate('/Books');
            })
        navigate('/Books');


        // console.log("nothing");
    }
    const onFailure = e => {
        // alert("Sign Up Failed")
        toast.success("Sign Up Failed", {
            position: "top-right"
        });
        console.log(e)
    }
    // console.log(logButton);
    return (
        logButton === false
            ?
            <>
                <div className="cover">
                    <Typography variant="h4" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                        SignUp <Button
                            color="primary"
                            style={{ borderRadius: "32px" }}
                            size="large"
                            className="form-input"
                            onClick={(e) => setLogButton(!logButton)}
                        >
                            Login
                        </Button>
                    </Typography>

                    <TextField
                        label="Username"
                        variant="outlined"
                        // fullWidth
                        className="form-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        // fullWidth
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        style={{ borderRadius: "32px", BackgrounColor: "rgb(32, 177, 255)" }}
                        className="login-btn form-input"
                        size="large"
                        onClick={register}
                    >
                        SignUp
                    </Button>
                    <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                        Or SignUp using
                    </Typography>

                    <div className="alt-login" >
                        <div className="google" >
                            <GoogleLogin className="blue"
                                clientId="400821186589-u1vait71482la17hds6048bh3ivr4r89.apps.googleusercontent.com"
                                buttonText=""
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={false}
                                icon={false}
                                theme="dark"

                            />
                        </div>
                    </div>

                    <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                        {status}
                    </Typography>

                </div>
            </> :
            <>

                <div className="cover">
                    {/* <form> */}
                    <Typography variant="h4" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                        Login <Button
                            color="primary"
                            style={{ borderRadius: "32px" }}
                            size="large"
                            className="form-input"
                            onClick={(e) => setLogButton(!logButton)}
                        >
                            SignUp
                        </Button>
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        // fullWidth
                        className="form-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        // fullWidth
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        style={{ borderRadius: "32px", BackgrounColor: "rgb(32, 177, 255)" }}
                        className="login-btn form-input"
                        size="large"
                        onClick={logged}
                    >Login
                    </Button>
                    {/* </form>  */}

                    <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                        Or Login using
                    </Typography>

                    <div className="alt-login">
                        <div className="google">
                            <GoogleLogin className="blue"
                                clientId="400821186589-u1vait71482la17hds6048bh3ivr4r89.apps.googleusercontent.com"
                                buttonText=""
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={false}
                                icon={false}
                                theme="dark"
                            />
                        </div>
                    </div>

                    <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                        {status}
                    </Typography>
                </div>
                <ToastContainer />
            </>

    )
}

export default LoginForm