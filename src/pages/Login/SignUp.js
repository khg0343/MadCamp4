import React, { useState, useEffect } from 'react';
import { FirestoreProvider } from "@react-firebase/firestore";
import '../../styles/SignUp.css'
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from "../../fBase"


function SignIn() {
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [notice, setNotice] = useState('')
    let history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
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


    return (
        <div className="SignIn">
            <form onSubmit={onSubmit} className="Container">
                <div className="InputContainer">
                    <input autoComplete="off" name="name" type="name" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
                    <input autoComplete="off" name="id" type="id" placeholder="Id" required value={id} onChange={e => setId(e.target.value)} />
                    <input autoComplete="off" name="email" type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input autoComplete="off" name="password" type="password" placeholder="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <input autoComplete="off" name="phone" type="phone" placeholder="Phone" required value={phone} onChange={e => setPhone(e.target.value)} />
                    <input autoComplete="off" name="birthday" type="birthday" placeholder="Birthday" required value={birthday} onChange={e => setBirthday(e.target.value)} />
                    <input autoComplete="off" name="gender" type="gender" placeholder="Gender" required value={gender} onChange={e => setGender(e.target.value)} />
                </div>
                <input className="SignUpBtn" type="submit" value={"Sign Up"} />
            </form>
            <h2>{notice}</h2>
            <NavLink className="SignBtn" exact to="/" activeClassName="selected">
                Sign In
            </NavLink>
        </div>
    )
}

export default SignIn;