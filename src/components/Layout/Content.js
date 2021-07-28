import React, { Component, useState, useContext} from 'react';
import { UserContext } from '../../store/users';
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import MainMenu from '../Menu/MainMenu';
import { firestore } from '../../fBase';
import { data } from '../../index'

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75%;
  .frontTitleDiv {
    height: fit-content;
  }
  .frontTitle {
  }
  h1 {
    width: fit-content;
    display: inline;
    color: ${props => props.theme.headerColor.color};
    font-weight: bold;
    font-size: 1.1rem;
  }
  button {
    display: inline;
    float: right;
    margin: 0% 1% 0% 0%;
    width: fit-content;
  }
`;

const Content = ({ fT, children }) => {
  const context = useContext(UserContext);
  const [ftEditable, setftEditable] = useState(false);
  return (
    <ContentWrapper>
      <div className='frontTitleDiv'>
        <h1 id='frontTitle' contentEditable={ ftEditable }>{ fT }</h1>
        <button class="favorite styled" type="button" 
          onClick={() => {
            setftEditable(true);
          }}>
          수정
        </button>
        <button class="favorite styled" type="button"
          onClick={() => {
            const mfrontTitle = document.getElementById('frontTitle').innerHTML;
            console.log(mfrontTitle);
            setftEditable(false);
            const onEditFTSubmit = async () => {
              await firestore.doc(`users/${ context.id }`).update({
                frontTitle: mfrontTitle
              });
            };
            onEditFTSubmit();
          }}>
          완료
        </button>
      </div>
      { children }
    </ContentWrapper>
  );
};  

export default Content;
    