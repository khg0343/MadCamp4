import React, { Component, useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';
import Card from '../../components/Layout/Card';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Surfing from './Surfing';
import TodayState from './TodayState';
import { publicUrl } from "../../utils/utils";
import { UserContext, SetUserDataContext } from "../../store/users";
import { firestore } from '../../fBase';

import { MdMailOutline, MdLocationOn, MdPhoneIphone} from "react-icons/md";


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
    width: 2.5%;
    height: 5%;
    opacity: 0;
    right: 53.8%;
    top: 38%;
    cursor: pointer;
  }
`;

const ProfileImg = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  height: 30vh;
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
      margin: 1vh 0.1vw 1vh 0.2vw;
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
    height: 10vh;
    margin: 1vw 2vh;
    font-size: 0.9rem;
    font-family: "Gulim";
  }
`;

const Home = () => {
  const location = useLocation()
  let today = ['-', '-']
  // const [todayInfo, setTodayInfo] = useState(today)
  const dateInfo = parseInt(Date().split(' ')[2])
  const context = useContext(UserContext);
  const contextData = useContext(SetUserDataContext);

  let history = useHistory();
  useEffect(() => {
    console.log(context, "context check")
    if (location.state.curLogin !== 'wodlxosxos') {
      if (dateInfo === context.last3) {
        today = [context.today3[0] + 1, context.today3[1] + 1]
      } else {
        today = [1, context.today3[1] + 1]
      }
      console.log(today)

      firestore.doc(`users/wodlxosxos`).update({
        today: today
      }).then(function () {
        console.log(1)
      }).catch(function (error) {
        console.log('error', error)
      })

      firestore.doc(`users/wodlxosxos`).update({
        last: dateInfo
      }).then(function () {
        console.log(1)
      }).catch(function (error) {
        console.log('error', error)
      })      
    } else {
      today = [context.today3[0] , context.today3[1] ]
    }
    // setTodayInfo(today);
    contextData();

  },[])

  return (
    <Layout iD={context.id3}>
      <Sidebar todayInfo={ context.today3 }>
        <Card>
          <FlexWrapper>
            <ProfileSection>
              <TodayState />
              <ProfileImg>
                <img
                  src={ publicUrl + "/resources/img/profile_"+ context.id3 +".png"}
                  alt="profile"
                />
              </ProfileImg>

              <Text>
                <span className="intro">{context.introduce3.replace("bb", "\n")}</span>
              </Text>
            </ProfileSection>
            <ProfileSection>
              <p>
                <span className="my-name">{ context.name3 }</span>
                <span className="my-sex">{ context.gender3 }</span>
                <span className="my-birthday">{ context.birthday3 }</span>
              </p>
              <p>
                <MdMailOutline />
                { context.email3 }
              </p>
              <p>
                <MdPhoneIphone />
                { context.phone3 }
              </p>
              <p>
                <MdLocationOn />
                { context.region3 }
              </p>
            </ProfileSection>
            <Surfing curLogin={location.state.curLogin} curName={location.state.curName}/>
          </FlexWrapper>
        </Card>
      </Sidebar>
      <Content fT={ context.frontTitle3 } iD={ context.id3 }>
        <Card>
          <ContentSection>
            <h2>Mini Room</h2>
            <div>
              <img
                className="backImg"
                src={publicUrl + "/resources/img/miniroom3.gif"}
                alt="miniroom"
              >
              </img>
              <button onClick={() => history.push({
                pathname: '/wodlxosxos/visiter',
                state: { curLogin: location.state.curLogin, today: context.today3, curName: location.state.curName}
              })} >
                <img
                  className='profImg'
                  src={publicUrl + '/resources/img/profile.jpg'}
                  alt="YoungHoon"
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