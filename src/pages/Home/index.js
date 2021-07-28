import React, { Component, useState, useEffect, useContext} from 'react';
import { UserContext } from '../../store/users';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';
import Card from '../../components/Layout/Card';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Surfing from './Surfing';
import TodayState from './TodayState';
import { firestore } from '../../fBase';

import {
  MdLink,
  MdMailOutline,
  MdLocationOn,
  MdPhoneIphone
} from 'react-icons/md';
import { publicUrl } from '../../utils/utils';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ContentSection = styled.section`
  height: fit-content !important;
  h2 {
    padding: 5px;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${props => props.theme.mainColor.color};
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
    width: 4%;
    height: 8%;
    right: 24%;
    top: 46%;
    cursor: pointer;
  }
`;

const ProfileImg = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  padding: 0.5vh 0.5vw;
  margin: 0.5vw;
  border: 0.4vmin solid #F0F1F0;
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
      margin: 1vh 0.1vw 1vh 0.2vw;
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
    color: ${props => props.theme.mainColor.color};
    font-size: 1rem;
    font-weight: bold;
  }
  .my-sex,
  .my-birthday {
    color: #9e9e9e;
    font-size: 0.85rem;
  }
  .my-sex {
    margin-right: 2px;
    font-size: 0.8rem;
  }
`;

const LinkTitle = styled.p`
  display: flex;
  align-items: center;
  margin: 0.8vh 0.5vw;
  &:first-of-type {
    margin-top: 2vh;
  }
  &:last-of-type {
    margin-bottom: 2vh;
  }
  cursor: pointer;
  svg {
    margin-right: 0.5vw;
    color: #666;
    font-size: 1.2rem;
  }
  &:hover {
    color: ${props => props.theme.mainColor.color};
  }
`;
const Home = () => {
  const location = useLocation()
  let today = ['-', '-']
  const [todayInfo, setTodayInfo] = useState(today)
  const dateInfo = parseInt(Date().split(' ')[2])
  let history = useHistory();
  useEffect(() => {
    firestore.collection('users').get().then(docs => {
      docs.forEach(doc => {
        if (location.state.curLogin === doc.data().id) {
          if (dateInfo === doc.data().last) {
            today = [doc.data().today[0] + 1, doc.data().today[1] + 1]
          } else {
            today = [1, doc.data().today[1] + 1]
          }
          console.log(today)
          firestore.doc(`users/${location.state.curLogin}`).update({
            today: today
          }).then(function () {
            console.log(1)
          }).catch(function (error) {
            console.log('error', error)
          })
          firestore.doc(`users/${location.state.curLogin}`).update({
            last: dateInfo
          }).then(function () {
            console.log(1)
          }).catch(function (error) {
            console.log('error', error)
          })
        }
      })
    }).then(tmp => {
      console.log(dateInfo)
      setTodayInfo(today)
    })
  }, []);
  const goGithub = () => {
    window.location.href = 'https://github.com/danbiilee/react-miniportfoly';
  };
  const goVelog = () => {
    window.location.href = 'https://velog.io/@dblee';
  };
  const context = useContext(UserContext);


  return (
    <Layout>
      <Sidebar todayInfo={todayInfo}>
        <Card>
          <FlexWrapper>
            <ProfileSection>
              <TodayState />
              <ProfileImg>
                <img src={publicUrl + '/resources/img/character.png'} alt="profile" />
              </ProfileImg>

              <LinkTitle onClick={goGithub}>
                <MdLink />
                Github
              </LinkTitle>
              <LinkTitle onClick={goVelog}>
                <MdLink />
                dblee.log
              </LinkTitle>
            </ProfileSection>
            <ProfileSection>
              <p>
                <span className="my-name">{ context.name }</span>
                <span className="my-sex">{ context.gender }</span>
                <span className="my-birthday">{ context.birthday }</span>
              </p>
              <p>
                <MdMailOutline />
                { context.email }
              </p>
              <p>
                <MdPhoneIphone />
                { context.phone }
              </p>
              <p>
                <MdLocationOn />
                { context.region }
              </p>
            </ProfileSection>
            <Surfing />
          </FlexWrapper>
        </Card>
      </Sidebar>
      <Content fT={ context.frontTitle }>
        <Card>
          <ContentSection>
            <h2>Mini Room</h2>
            <div>
              <img
                className='backImg'
                src={publicUrl + '/resources/img/miniroom.gif'}
                alt="miniroom"
              >
              </img>
              <button onClick={() => history.push({
                pathname: '/profile',
                state: { today: todayInfo }
              })} >
                <img
                  className='profImg'
                  src={publicUrl + '/resources/img/profile.jpg'}
                />
              </button>
            </div>
          </ContentSection>
        </Card>
      </Content>
    </Layout>
  );
};
export default Home;