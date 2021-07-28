import React, { Component, useState} from 'react';
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import MainMenu from '../Menu/MainMenu';
import { firestore } from '../../fBase';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75%;
  h1 {
    color: ${props => props.theme.headerColor.color};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Content = ({ children }) => {
  const [title, setTitle] = useState('나다')

  // 작성 코드
  const getHeader = async () => {
    await firestore
    .collection('users')
    .where('id', '==', 'qorwldbs12@kaist.ac.kr')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
        // 변수 = doc.header 받고 변수를 content header 에 넣기
        setTitle(doc.data().header);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  };
  getHeader();

  return (
    <ContentWrapper>
      {children}
    </ContentWrapper>
  );
};  

export default Content;
    