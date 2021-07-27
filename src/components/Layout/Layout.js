import React from 'react';
import styled from 'styled-components';
import Setting from '../Setting';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  padding: 3vh 1.5vw;
  background: ${props => props.theme.bg.color};
`;

const BorderWrapper = styled.div`
  width: 100%;
  height: 95vh;
  padding: 4vh 2vw;
  background: ${props => props.theme.layoutBg1.color};
  border: 1px solid ${props => props.theme.layoutBorder1.color};
  border-radius: 10px;
`;

const BgWrapper = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  height: 100%;
  padding: 4vh 1vw 1vh;
  background: ${props => props.theme.layoutBg2.color};
  border: 2px dashed ${props => props.theme.layoutBorder2.color};
  border-radius: 10px;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <BorderWrapper>
        <BgWrapper>{children}</BgWrapper>
      </BorderWrapper>
      {/* <Setting /> */}
    </Wrapper>
  );
};

export default Layout;
