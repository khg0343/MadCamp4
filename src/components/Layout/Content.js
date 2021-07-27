import React, { Component } from 'react';
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import MainMenu from '../Menu/MainMenu';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  h1 {
    color: ${props => props.theme.headerColor.color};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Content = ({ children }) => {
  return (
    <ContentWrapper>
      {/* <h1>danbi::miniportfoly</h1> */}
      <div>
        <EditText
          style={{ width: '100%', height: '20px', fontWeight: 'bold'}}
          inline
        />
      </div>

      {children}
      {/* <MainMenu /> */}
    </ContentWrapper>
  );
};

export default Content;
