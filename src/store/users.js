import React, { createContext, useState } from "react";
import { firestore } from '../fBase';

export const UserContext = createContext();

const UserStore = (props) => {
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [frontTitle, setFrontTitle] = useState('');
  const [gender, setGender] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');

  const getData = async () => {
    await firestore
    .collection('users')
    .where('id', '==', 'testfor')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setBirthday(doc.data().birthday)
        setEmail(doc.data().email);
        setFrontTitle(doc.data().frontTitle);
        setGender(doc.data().gender);
        setId(doc.data().id);
        setName(doc.data().name);
        setPassword(doc.data().password);
        setPhone(doc.data().phone);
        setState(doc.data().state);
        setRegion(doc.data().region);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  };

  getData();
  console.log(birthday)
  console.log(frontTitle);
  let a = frontTitle;
  const users = {
    birthday: birthday,
    email: email,
    frontTitle: frontTitle,
    gender: gender,
    id: id,
    name: name,
    password: password,
    phone: phone,
    state: state,
    region: region
  };

  return (
    <UserContext.Provider value={users}>{props.children}</UserContext.Provider>
  );
};

export default UserStore;