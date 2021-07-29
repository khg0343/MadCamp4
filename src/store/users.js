import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../fBase";

export const UserContext = createContext();
export const SetUserDataContext = createContext(() => {});

const UserStore = (props) => {
  const [birthday1, setBirthday1] = useState("");
  const [email1, setEmail1] = useState("");
  const [frontTitle1, setFrontTitle1] = useState("");
  const [gender1, setGender1] = useState("");
  const [id1, setId1] = useState("");
  const [name1, setName1] = useState("");
  const [password1, setPassword1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [state1, setState1] = useState("");
  const [region1, setRegion1] = useState("");
  const [introduce1, setIntroduce1] = useState("");
  const [background1, setBackground1] = useState("");
  const [today1, setToday1] = useState([0, 0]);
  const [last1, setLast1] = useState(0);

  const [birthday2, setBirthday2] = useState("");
  const [email2, setEmail2] = useState("");
  const [frontTitle2, setFrontTitle2] = useState("");
  const [gender2, setGender2] = useState("");
  const [id2, setId2] = useState("");
  const [name2, setName2] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [state2, setState2] = useState("");
  const [region2, setRegion2] = useState("");
  const [introduce2, setIntroduce2] = useState("");
  const [background2, setBackground2] = useState("");
  const [today2, setToday2] = useState([0, 0]);
  const [last2, setLast2] = useState(0);

  const [birthday3, setBirthday3] = useState("");
  const [email3, setEmail3] = useState("");
  const [frontTitle3, setFrontTitle3] = useState("");
  const [gender3, setGender3] = useState("");
  const [id3, setId3] = useState("");
  const [name3, setName3] = useState("");
  const [password3, setPassword3] = useState("");
  const [phone3, setPhone3] = useState("");
  const [state3, setState3] = useState("");
  const [region3, setRegion3] = useState("");
  const [introduce3, setIntroduce3] = useState("");
  const [background3, setBackground3] = useState("");
  const [today3, setToday3] = useState([0, 0]);
  const [last3, setLast3] = useState();

  function getData() {
    getData1("testfor");
    getData2("khg0343");
    getData3("wodlxosxos");
  }

  const getData1 = async (id) => {
    await firestore
      .collection("users")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setBirthday1(doc.data().birthday);
          setEmail1(doc.data().email);
          setFrontTitle1(doc.data().frontTitle);
          setGender1(doc.data().gender);
          setId1(doc.data().id);
          setName1(doc.data().name);
          setPassword1(doc.data().password);
          setPhone1(doc.data().phone);
          setState1(doc.data().state);
          setRegion1(doc.data().region);
          setIntroduce1(doc.data().introduce);
          setBackground1(doc.data().background);
          setToday1(doc.data().today);
          setLast1(doc.data().last);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const getData2 = async (id) => {
    await firestore
      .collection("users")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setBirthday2(doc.data().birthday);
          setEmail2(doc.data().email);
          setFrontTitle2(doc.data().frontTitle);
          setGender2(doc.data().gender);
          setId2(doc.data().id);
          setName2(doc.data().name);
          setPassword2(doc.data().password);
          setPhone2(doc.data().phone);
          setState2(doc.data().state);
          setRegion2(doc.data().region);
          setIntroduce2(doc.data().introduce);
          setBackground2(doc.data().background);
          setToday2(doc.data().today);
          setLast2(doc.data().last);
        });
        console.log('getdata2 - reload')
        console.log(last2 + "users last 2")
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const getData3 = async (id) => {
    await firestore
      .collection("users")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setBirthday3(doc.data().birthday);
          setEmail3(doc.data().email);
          setFrontTitle3(doc.data().frontTitle);
          setGender3(doc.data().gender);
          setId3(doc.data().id);
          setName3(doc.data().name);
          setPassword3(doc.data().password);
          setPhone3(doc.data().phone);
          setState3(doc.data().state);
          setRegion3(doc.data().region);
          setIntroduce3(doc.data().introduce);
          setBackground3(doc.data().background);
          setToday3(doc.data().today);
          setLast3(doc.data().last);
        });
        console.log('getdata3 - test')
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const user = {
    birthday1: birthday1,
    email1: email1,
    frontTitle1: frontTitle1,
    gender1: gender1,
    id1: id1,
    name1: name1,
    password1: password1,
    phone1: phone1,
    state1: state1,
    region1: region1,
    introduce1: introduce1,
    background1: background1,
    today1: today1,
    last1: last1,

    birthday2: birthday2,
    email2: email2,
    frontTitle2: frontTitle2,
    gender2: gender2,
    id2: id2,
    name2: name2,
    password2: password2,
    phone2: phone2,
    state2: state2,
    region2: region2,
    introduce2: introduce2,
    background2: background2,
    today2: today2,
    last2: last2,

    birthday3: birthday3,
    email3: email3,
    frontTitle3: frontTitle3,
    gender3: gender3,
    id3: id3,
    name3: name3,
    password3: password3,
    phone3: phone3,
    state3: state3,
    region3: region3,
    introduce3: introduce3,
    background3: background3,
    today3: today3,
    last3: last3,
  };
  
  useEffect(() => {
    getData1("testfor");
    getData2("khg0343");
    getData3("wodlxosxos");
  }, [])

  return (
    <SetUserDataContext.Provider value={getData}>
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    </SetUserDataContext.Provider>
    
  );
};

export default UserStore;
