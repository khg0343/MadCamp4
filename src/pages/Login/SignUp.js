import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from "../../fBase"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#E66E28",
        color: 'white',
        borderRadius: 10,
        margin: 10,
    },
    titleIcon: {
        width: '90px',
        height: '90px',
    },
    titleText: {
        marginTop: 10,
        width: '180px',
        height: 'auto'
    },
    noticeTextCont: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    noticeText: {
        width: '150px',
        fontWeight: 'bold',
        color: 'red',
    },
    btnCont: {
        display: 'flex',
        flexDirection: 'row',
    }
}));


export default function SignIn() {
    const classes = useStyles();
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [notice, setNotice] = useState('')
    let history = useHistory();

    const onClick = (event) => {
        event.preventDefault();
        let check = false
        firestore.collection('users').get().then(docs => {
            docs.forEach(doc => {
                if (id === doc.data().id && password === doc.data().password) {
                    check = true
                }
            })
        }).then(tmp => {
            console.log(1)
            if (!check) {
                setNotice('옳지 않은 정보입니다.')
                setPassword('')
            } else {
                console.log(2)
                setNotice('')
                history.replace('/home')
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.titleIcon} alt={"titleIcon"} src={"/react-miniportfoly/resources/img/title_icon.png"} />
                <img className={classes.titleText} alt={"titleIcon"} src={"/react-miniportfoly/resources/img/title_text.png"} />
                <Typography component="h1" variant="h5"></Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="off"
                        autoFocus
                        onChange={e => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="off"
                        autoFocus
                        onChange={e => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="off"
                        autoFocus
                        onChange={e => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="off"
                        autoFocus
                        onChange={e => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="off"
                        autoFocus
                        onChange={e => setId(e.target.value)}
                    />
                    <div className={classes.noticeTextCont}>
                        <h3 className={classes.noticeText}>{notice}</h3>
                    </div>
                    <div className={classes.btnCont}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={onClick}
                        >
                            Sign Up
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={e => history.replace('/')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}