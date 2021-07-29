import React, { useState, useContext } from "react";
import { UserContext, SetUserDataContext } from "../../store/users";
import { useLocation, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { firestore } from "../../fBase";

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
    margin-left: 1vw;
    color: ${(props) => props.theme.headerColor.color};
    font-weight: bold;
    font-size: 1.1rem;
  }
  button {
    display: flex;
    color: white;
    background: #B3B3B3;
    border: none;
    float: right;
    margin: 0vh 7vw 0 0;
    width: fit-content;
  }
  h3 {
    display: flex;
    float: right;
    color: #777777;
    margin-top:1.5vh;
    margin-bottom: 0;
    font-size: 0.1rem;
  }
`;

const Content = ({ fT, iD, children }) => {
  const context = useContext(UserContext);
  const contextData = useContext(SetUserDataContext);
  const [ftEditable, setftEditable] = useState(false);
  const location = useLocation();

  function Edit() {
    setftEditable(true);
  }
  function Complete(){
    const mfrontTitle = document.getElementById("frontTitle").innerHTML;
            console.log(mfrontTitle);
            setftEditable(false);
            const onEditFTSubmit = async () => {
              await firestore.doc(`users/${iD}`).update({
                frontTitle: mfrontTitle,
              });
            };
            onEditFTSubmit();
            contextData();
  }

  return (
    <ContentWrapper>
      <div className="frontTitleDiv">
        <h1 id="frontTitle" contentEditable={ftEditable}>
          {fT}
        </h1>
        <h3> https://www.kaiworld.com/{iD}</h3>
        <button
          class="favorite styled"
          type="button"
          style={{visibility: (iD === location.state.curLogin )?"":"hidden"}}
          onClick={() => {
           ftEditable ? Complete() : Edit();
          }}
        >
          {ftEditable ? '완료' : '수정'}
        </button>
        
      </div>
      {children}
    </ContentWrapper>
  );
};

export default Content;
