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
    selGender: {
        margin: theme.spacing(3, 0, 2),
        color: 'black',
        margin: 2,
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
        width: '220px',
        fontWeight: 'bold',
        color: 'red',
    },
    btnCont: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
    },
    inputCont: {
        fontSize: 12,
    },
    birthText: {
        fontWeight: 'bold',
    },
    birthTextCont: {
        alignItems: 'flex-end',
        display: 'flex',
        marginTop: 5,
    }
}));


export default function SignUp() {
    const classes = useStyles();
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [notice, setNotice] = useState('')
    const [maleBtn, setMaleBtn] = useState("white")
    const [femaleBtn, setFemaleBtn] = useState("white")

    let history = useHistory();

    const onClick = (event) => {
        event.preventDefault();
        if (id === '' | email === '' | password === '' | birthday === '' | gender === '' | phone === '' | name === '') {
            setNotice('입력되지 않은 정보가 존재합니다.')
        }
        else {
            let check = true
            firestore.collection('users').get().then(docs => {
                docs.forEach(doc => {
                    if (id === doc.data().id | email === doc.data().email) {
                        check = false
                        setNotice('이미 존재하는 ID or Email 입니다.')
                    }
                })
            }).then(tmp => {
                console.log(check)
                if (check) {
                    firestore.collection('users').doc(id).set({
                        name: name,
                        password: password,
                        id: id,
                        phone: phone,
                        email: email,
                        gender: gender,
                        state: '졸림',
                        today: [0, 0],
                        birthday: birthday
                    }).then(function () {
                        console.log(1)
                    }).catch(function (error) {
                        console.log('error', error)
                    })
                    setBirthday('')
                    setEmail('')
                    setGender('')
                    setId('')
                    setName('')
                    setPassword('')
                    setPhone('')
                    history.replace('/')
                }
            })
        }
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
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="off"
                        autoFocus
                        size="small"
                        margin="dense"
                        onChange={e => setName(e.target.value)}
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
                        size="small"
                        margin="dense"
                        onChange={e => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email."
                        name="email"
                        autoComplete="off"
                        size="small"
                        margin="dense"
                        onChange={e => setEmail(e.target.value)}
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
                        size="small"
                        margin="dense"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="off"
                        size="small"
                        margin="dense"
                        onChange={e => setPhone(e.target.value)}
                    />
                    <div className={classes.birthTextCont}>
                        <h3 className={classes.birthText}>BirthDay</h3>
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="off"
                        size="small"
                        type="date"
                        margin="dense"
                        onChange={e => setBirthday(e.target.value)}
                    />
                    <div className={classes.birthTextCont}>
                        <h3 className={classes.birthText}>Gender</h3>
                    </div>
                    <div className={classes.btnCont}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: `${femaleBtn}` }}
                            className={classes.selGender}
                            onClick={() => { setGender('여자'); setMaleBtn('white'); setFemaleBtn('gray') }}
                        >
                            여자
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: `${maleBtn}` }}
                            className={classes.selGender}
                            onClick={() => { setGender('남자'); setMaleBtn('gray'); setFemaleBtn('white') }}
                        >
                            남자
                        </Button>
                    </div>
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
        </Container >
    );
}