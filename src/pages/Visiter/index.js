import React, { useState, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Switch, Route, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Layout/Card";
import Surfing from "../Home/Surfing";
import TodayState from "../Home/TodayState";
import SubMenu from "../../components/Menu/SubMenu";
import Sidebar from "../../components/Layout/Sidebar";
import Content from "../../components/Layout/Content";

import { UserContext, SetUserDataContext } from "../../store/users";

import ImageButton from "react-image-button";
import { publicUrl } from "../../utils/utils";
import { firestore } from '../../fBase';
import {
  MdLink,
  MdMailOutline,
  MdLocationOn,
  MdPhoneIphone,
} from "react-icons/md";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ProfileImg = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  padding: 0.5vh 0.5vw;
  margin: 0.5vw;
  border: 0.4vmin solid #f0f1f0;
  border-radius: 1vmin;
`;

const ProfileSection = styled.section`
  height: fit-content !important;
  &:last-of-type {
    padding: 1vh 0vw;
    border-top: 1px dashed #a5a5a5;
    p {
      display: flex;
      align-items: center;
      margin: 1vh 0.5vw;
      font-size: 0.9rem;
      font-family: "Gulim";
    }
    svg {
      margin-right: 0.3vw;
      color: #666;
    }
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    align-items: center;
    justify-content: center;
  }
  .my-name {
    margin-right: 5px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.mainColor.color};
    font-size: 1rem;
    font-family: "Gulim";
    font-weight: bold;
  }
  .my-birthday {
    margin-bottom: 5px;
    color: #9e9e9e;
    font-size: 0.85rem;
  }
  .my-sex {
    margin-right: 2px;
    margin-bottom: 5px;
    color: #9e9e9e;
    font-size: 0.8rem;
  }
`;

const Text = styled.text`
  .intro {
    display: flex;
    height: 17vh;
    margin: 1vw 2vh;
    font-size: 0.9rem;
    font-family: "Gulim";
  }
`;

const Title = styled.h2`
  margin: 1vh 1vw;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
  font-weight: bold;
  color: #238db3;
`;

const VisiterBook = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 22vh;
  // padding: 1.5vh 1.5vw;
  margin: 3vh 1.5vw;
  background: #f6f6f6;
  border-top: 1px solid #cacaca;
  border-bottom: 1px solid #cacaca;
  div {
    display: flex;
    flex-direction: row;
  }
`;

const VisiterProfile = styled.div`
  display: flex;
  height: 15vmin;
  width: 15vmin;
  background: white;
  margin: 2vmin;
  margin-bottom: 1vmin;
  margin-right: 0;
`;

const VisiterInputText = styled.div`
  display: flex;
  height: 15vmin;
  flex-grow: 1;
  background: white;
  border: 1px solid #cacaca;
  margin: 2vmin;
  margin-bottom: 1vmin;
  input {
    width: 100%;
    border: none;
  }
`;

const VisiterText = styled.div`
  display: flex;
  flex-grow: 1;
  background: white;
  // border: 1px solid #cacaca;
  margin: 2vmin;
  margin-bottom: 1vmin;
  white-space: pre-wrap;
  .content {
    display: flex;
    height: fit-content !important;
    margin: 1vw 2vh;
    font-size: 0.9rem;
    font-family: "Gulim";
  }
`;

const VisiterButton = styled.div`
  display: flex;
  align-content: flex-end;
  margin-left: auto;
  margin-bottom: 1vh;
  margin-right: 2vmin;
  background: transparent;
  border: none;
  img {
    height: 3vh;
    border: none;
  }
`;

const VisiterPostHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-between;
  height: 4.5vh;
  background: #f6f6f6;
  border-top: 1px solid #cacaca;
  border-bottom: 1px solid #cacaca;
  div {
    display: flex;
    flex-direction: row;
  }
  .txt-no {
    width: 4vw;
    margin-left: 1vw;
    font-size: 0.5rem;
  }
  .txt-name {
    font-weight: bold;
    color: #324c79;
  }
  .txt-date {
    margin-left: 1vw;
    font-size: 0.7rem;
  }
  .img-home {
    height: 3vmin;
    width: 2.8vmin;
    margin-left: 0.2vw;
    align-content: center;
  }
`;

const VisiterPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content !important;
  // padding: 1.5vh 1.5vw;
  margin: 3vh 1.5vw;
  background: #ffffff;
  div {
    display: flex;
    flex-direction: row;
  }
`;

const Visiter = () => {
  const location = useLocation();
  const match = useRouteMatch();
  const context = useContext(UserContext);
  const contextData = useContext(SetUserDataContext);
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  // 하단 input 박스에서 값 변경 시 이벤트 객체가 파라미터(e)에 담겨서 온다.

  const onChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    firestore
      .collection('users')
      .where('id', '==', 'testfor')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(doc.data().visiterbook.reverse());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [])

  const visiter_check = () => {
    if (text !== '') {
      alert(text + "을 등록하겠습니까?");
      let a = location.state.curLogin + '/' + location.state.curName +  '/' + text + '/2021.07.' + Date().split(' ')[2] + ' ' + Date().split(' ')[4];
      let tmpData = [...data];
      tmpData.unshift(a)
      firestore.doc(`users/testfor`).update({
        visiterbook: tmpData
      }).then(function () {
        console.log(1);
        setData(tmpData);
      }).catch(function (error) {
        console.log('error', error)
      })
      setText("");

      contextData();
    } else {
      alert("내용을 입력하세요");
    }
  };

  return (
    <Layout>
      <Sidebar todayInfo={location.state.today}>
        <Card>
          <FlexWrapper>
            <ProfileSection>
              <TodayState />
              <ProfileImg>
                <img
                  src={publicUrl + "/resources/img/character.png"}
                  alt="profile"
                />
              </ProfileImg>
              <Text>
                <span className="intro">{context.id1 + "입니다"}</span>
              </Text>
            </ProfileSection>
            <ProfileSection>
              <p>
                <span className="my-name">{context.name1}</span>
                <span className="my-sex">{context.gender1}</span>
                <span className="my-birthday">{context.birthday1}</span>
              </p>
              <p>
                <MdMailOutline />
                {context.email1}
              </p>
              <p>
                <MdPhoneIphone />
                {context.phone1}
              </p>
              <p>
                <MdLocationOn />
                {context.region1}
              </p>
            </ProfileSection>
            <Surfing curLogin={location.state.curLogin} curName={location.state.curName}/>
          </FlexWrapper>
        </Card>
      </Sidebar>
      <Content fT={context.frontTitle1}>
        <Card>
          <Title>Visiter</Title>
          <VisiterBook>
            <div>
              <VisiterProfile>
                <img
                  src={publicUrl + "/resources/img/minimi_"+ location.state.curLogin +".png"}
                  alt="profile"
                />
              </VisiterProfile>
              <VisiterInputText>
                <input onChange={onChange} value={text} />
              </VisiterInputText>
            </div>
            <VisiterButton>
              <img
                src={publicUrl + "/resources/img/visiter_check.png"}
                alt="check"
                onClick={() => visiter_check()}
              />
            </VisiterButton>
          </VisiterBook>
          {data.map(post => (
            <VisiterPost>
              <VisiterPostHeader>
                <text className="txt-no">No. {data.length - data.indexOf(post)}</text>
                <text className="txt-name">{post.split('/')[1]}</text>
                <img
                  className="img-home"
                  src={publicUrl + "/resources/img/visiter_home.png"}
                  alt="home"
                />
                <text className="txt-date">({post.split('/')[3]})</text>
              </VisiterPostHeader>
              <div>
                <VisiterProfile>
                  <img
                    src={publicUrl + "/resources/img/minimi_"+ post.split('/')[0] +".png"}
                    alt="profile"
                  />
                </VisiterProfile>
                <VisiterText>
                  <span className="contents">
                    {post.split('/')[2]}
                  </span>
                </VisiterText>
              </div>
            </VisiterPost>
          ))}
        </Card>
      </Content>
    </Layout>
  );
};

export default Visiter;
