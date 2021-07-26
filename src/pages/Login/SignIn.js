import React, { useState, useEffect } from 'react';
import '../../styles/SignIn.css'
import { NavLink, Redirect, Route, Link, useHistory } from 'react-router-dom';
import { authService } from '../../fBase';
import styled from 'styled-components';


function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(false)
    const [notice, setNotice] = useState('')
    let history = useHistory();

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
                setNotice("회원가입이 완료되었습니다.")
            } else {
                // login
                data = await authService.signInWithEmailAndPassword(email, password);
                setNotice("로그인 성공")
                history.replace('/home')
            }
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
            if (error.code === "auth/user-not-found") {
                setNotice("존재하지 않는 계정입니다.")
            } else if (error.code === "auth/wrong-password") {
                setNotice("옳지 않은 비밀번호입니다.")
            }
            setPassword('')
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <div className="SignIn">
            <form onSubmit={onSubmit} className="Container">
                <div className="InputContainer">
                    <input name="email" type="email" placeholder="Email" required value={email} onChange={handleEmail} />
                    <input name="password" type="password" placeholder="password" required value={password} onChange={handlePassword} />
                </div>
                <input type="submit" value={newAccount ? "Sign Up" : "Sign In"} />
            </form>
            <h2>{notice}</h2>
            <span className="SignBtn" onClick={toggleAccount}>{newAccount ? "Sign In" : "Sign Up"} </span>
        </div>
    )
}

export default SignIn;