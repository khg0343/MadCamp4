import React, { Component, useState, useContext} from 'react';
import { UserContext } from '../../store/users'
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import MainMenu from '../Menu/MainMenu';
import { firestore } from '../../fBase';
import { data } from '../../index'

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
      {children}
    </ContentWrapper>
  );
};  

export default Content;
    