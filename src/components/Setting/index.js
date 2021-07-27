import React from 'react';
import styled from 'styled-components';
import ChangeSkin from './Skin';
import MusicPlayer from './Music';
import EditProfile from './Profile'

const Wrapper = styled.div`
  width: 20%;
  font-size: 0.9rem;
  & > div {
    padding: 10px;
    border: 1px solid #a5a5a5;
    border-radius: 5px;
  }
`;

const Setting = () => {
  return (
    <Wrapper>
      <MusicPlayer />
      <ChangeSkin />
      <EditProfile />
    </Wrapper>
  );
};

export default React.memo(Setting);
