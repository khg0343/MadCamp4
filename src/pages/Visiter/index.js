import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Layout/Card";
import Surfing from "../Home/Surfing";
import TodayState from "../Home/TodayState";
import SubMenu from "../../components/Menu/SubMenu";
import Sidebar from "../../components/Layout/Sidebar";
import Content from "../../components/Layout/Content";
// import VisiterPost from "../../components/Layout/VisiterPost";
import ImageButton from "react-image-button";
import Intro from "./Intro";
import People from "./People";
import { publicUrl } from "../../utils/utils";
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
  .intro{
    display: flex;
    height: 17vh;
    margin: 1vw 2vh;
    font-size: 0.9rem;
    font-family: "Gulim";
  }
`;

const ContentHeader = styled.section`
  height: fit-content !important;
  display: flex;
  flex-direction: row;
  margin-left: 1vw;
  margin-right: 1vw;
  h1 {
    font-weight: bold;
    display: flex;
    width: 80%;
  }
  h3 {
    display: flex;
    margin-top: 1vh;
    color: #777777;
    font-size: 0.1rem;
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

const VisiterButton = styled.button`
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
  const list = [
    {
      id: 1,
      title: "👩‍💻내 소개",
      url: "/intro",
      child: [
        { id: 1, title: "기본정보", url: "/default" },
        { id: 3, title: "기술 및 히스토리", url: "/dev" },
        { id: 4, title: "TMI 자문자답", url: "/qna" },
      ],
    },
    {
      id: 2,
      title: "👭내 인맥",
      url: "/people",
    },
  ];

  const [text, setText] = useState("");
  // 하단 input 박스에서 값 변경 시 이벤트 객체가 파라미터(e)에 담겨서 온다.

  const onChange = (e) => {
    setText(e.target.value);
  };

  const visiter_check = () => {
    alert(text + "을 등록하겠습니까?");
    setText("");
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
                <span className="intro">
                  안녕 나는
                  백지윤이야ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </span>
              </Text>
            </ProfileSection>
            <ProfileSection>
              <p>
                <span className="my-name">김현지</span>
                <span className="my-sex">(♀)</span>
                <span className="my-birthday">2000.09.27</span>
              </p>
              <p>
                <MdMailOutline />
                khg0343@kaiworld.com
              </p>
              <p>
                <MdPhoneIphone />
                010-5643-6248
              </p>
              <p>
                <MdLocationOn />
                울산광역시
              </p>
            </ProfileSection>
            <Surfing />
          </FlexWrapper>
        </Card>
      </Sidebar>
      <Content>
        <ContentHeader>
          <h1> FrontHeader </h1>
          <h3> https://www.kaiworld.com/khg0343</h3>
        </ContentHeader>
        <Card>
          <Title>Visiter</Title>
          <VisiterBook>
            <div>
              <VisiterProfile>
                <img
                  src={publicUrl + "/resources/img/minimi1.png"}
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

          <VisiterPost>
            <VisiterPostHeader>
              <text className="txt-no">No. 1</text>
              <text className="txt-name">김현지</text>
              <img
                className="img-home"
                src={publicUrl + "/resources/img/visiter_home.png"}
                alt="home"
              />
              <text className="txt-date">(2021.07.28)</text>
              {/* <button className="btn-">(2021.07.28)</button> */}
            </VisiterPostHeader>
            <div>
              <VisiterProfile>
                <img
                  src={publicUrl + "/resources/img/minimi1.png"}
                  alt="profile"
                />
              </VisiterProfile>
              <VisiterText>
                <span className="contents">
                  ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </span>
              </VisiterText>
            </div>
          </VisiterPost>

          <VisiterPost>
            <VisiterPostHeader>
              <text className="txt-no">No. 1</text>
              <text className="txt-name">김현지</text>
              <img
                className="img-home"
                src={publicUrl + "/resources/img/visiter_home.png"}
                alt="home"
              />
              <text className="txt-date">(2021.07.28)</text>
            </VisiterPostHeader>
            <div>
              <VisiterProfile>
                <img
                  src={publicUrl + "/resources/img/minimi1.png"}
                  alt="profile"
                />
              </VisiterProfile>
              <VisiterText>
                <span className="contents">
                  ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </span>
              </VisiterText>
            </div>
          </VisiterPost>
        </Card>
      </Content>
    </Layout>
  );
};

export default Visiter;
