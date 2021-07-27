import React, { useState, useEffect } from 'react';
import '../../styles/SignIn.css'
import { NavLink, Redirect, Route, Link, useHistory } from 'react-router-dom';
import { authService } from '../../fBase';
import styled from 'styled-components';
import { firestore } from "../../fBase"


function SignIn() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(false)
    const [notice, setNotice] = useState('')
    let history = useHistory();

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleId = (e) => {
        setId(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = (event) => {
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
                history.replace('/home')
            }
        })
    }


    return (
        <div className="SignUp">
            <form onSubmit={onSubmit} className="Container">
                <div className="InputContainer">
                    <input name="id" type="id" placeholder="Id" required value={id} onChange={handleId} />
                    <input name="password" type="password" placeholder="password" required value={password} onChange={handlePassword} />
                </div>
                <input type="submit" value={"Sign In"} />
            </form>
            <h2>{notice}</h2>
            <NavLink className="SignBtn" exact to="/signUp" activeClassName="selected">
                Sign Up
            </NavLink>
        </div>
    )
}

export default SignIn;