import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Layout/Sidebar";
import Content from "../../components/Layout/Content";
import Card from "../../components/Layout/Card";
import Surfing from "./Surfing";
import TodayState from "./TodayState";
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

const ContentSection = styled.section`
  // width: fit-content !important;
  height: fit-content !important;
  margin: 0.5vh 0.7vw;
  h2 {
    padding: 5px;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${(props) => props.theme.mainColor.color};
  }
  &:first-of-type {
    h2 {
      margin-bottom: 5px;
    }
    div {
      position: relative;
      width: 100%;
      min-height: 200px;
    }
  }
  &:last-of-type {
    margin-top: 20px;
    h2 {
      margin-bottom: 15px;
      border-bottom: 2px solid #eee;
    }
  }
  ul {
    line-height: 1.8;
    li {
      height: 30px;
      border-bottom: 1px dashed #a5a5a5;
    }
  }
  .backImg {
    width: 100%;
  }
  .profImg {
    position: absolute;
    width: 12%;
    height: auto;
    right: 20%;
    top: 30%;
    cursor: pointer;
  }
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

const Home = () => {
  return (
    <Layout>
      <Sidebar>
        <Card>
          <FlexWrapper>
            <ProfileSection>
              <TodayState />
              <ProfileImg>
                <img
                  src={ publicUrl + "/resources/img/character.png"}
                  alt="profile"
                />
              </ProfileImg>

              <Text>
                <span className="intro">안녕 나는 백지윤이야ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span>
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
          <h1> Title </h1>
          <h3> https://www.kaiworld.com/khg0343</h3> 
        </ContentHeader>
        <Card>
          <ContentSection>
            <h2>Mini Room</h2>
            <div>
              <img
                className="backImg"
                src={publicUrl + "/resources/img/miniroom.gif"}
                alt="miniroom"
              />
              <a href= {publicUrl + "/visiter"}>
                <img
                  className="profImg"
                  src={publicUrl + "/resources/img/mProfile.png"}
                  alt="YoungHoon"
                />
              </a>
            </div>
          </ContentSection>
          <ContentSection>
            <h2>한 줄 감성</h2>
            <ul>
              <li>아아아아아아아아아~☆</li>
              <li>야야야야야야야야야양~☆</li>
              <li>오오오오오오오오오오오~☆</li>
              <li></li>
              <li></li>
            </ul>
          </ContentSection>
        </Card>
      </Content>
    </Layout>
  );
};
export default Home;
