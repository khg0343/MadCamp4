import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Layout/Card';
import SubMenu from '../../components/Menu/SubMenu';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';
import Intro from './Intro';
import People from './People';
import Favorite from './Favorite';

const Profile = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const list = [
    {
      id: 1,
      title: '👩 💻내 소개',
      url: '/intro',
      child: [
        { id: 1, title: '기본정보', url: '/default' },
        { id: 3, title: '기술 및 히스토리', url: '/dev' },
        { id: 4, title: 'TMI 자문자답', url: '/qna' },
      ],
    },
    {
      id: 2,
      title: '👭내 인맥',
      url: '/people',
    },
    {
      id: 3,
      title: '⭐내 즐겨찾기',
      url: '/favorite',
    },
  ];

  return (
    <Layout>
      <Sidebar todayInfo={location.state.today}>
        <Card>
          <SubMenu title="Profile" list={list} />
        </Card>
      </Sidebar>
      <Content>
        <Card>
          <Switch>
            <Route exact path={`${match.path}`} component={Intro} />
            <Route exact path={`${match.path}/intro`} component={Intro} />
            <Route path={`${match.path}/intro/:type`} component={Intro} />
            <Route path={`${match.path}/people`} component={People} />
            <Route path={`${match.path}/favorite`} component={Favorite} />
          </Switch>
        </Card>
      </Content>
    </Layout>
  );
};

export default Profile;