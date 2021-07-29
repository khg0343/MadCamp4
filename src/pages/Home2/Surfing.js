import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { publicUrl } from "../../utils/utils";
import { useLocation, useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  margin: 0.75vh 0.5vw;
  background: #ffffff;
  border: 0.4vmin solid #f0f1f0;
  border-radius: 0.8vmin;
`;

const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
  text {
    color: #1185af;
    font-weight: bold;
    font-size: 0.8rem;
    margin-left: 0.5vw;
    margin-top: 0.15vh;
    margin-bottom: 0.15vh;
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  cursor: pointer;
  position: relative;
  z-index: 3;
`;

const FriendList = styled.ol`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  height: 10vh;
  width: 12.8vw;
  flex-direction: column;
  padding: 10px;
  margin-top: 2px;
  overflow: scroll;
  overflow-x: hidden;
  // border-top: 0.4vmin solid #f0f1f0;
  border-top: 0.1vmin solid #333333;
  border-bottom: 0.1vmin solid #333333;
  border-left: 0.1vmin solid #333333;
  border-right: 0.1vmin solid #333333;
  background: #ffffff;
  color: #333333;
  position: absolute;
  z-index: 2;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 1rem;
  padding: 0 2.5vw 0 0.2vw;
  border-radius: 5px;
  border: white;
  cursor: pointer;
`;

const Li = styled.li`
  padding: 0.8vh;
  width: 100%;
  display: flex;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #a5a5a5;
  }
  cursor: pointer;
  W &:hover {
    font-weight: bold;
  }
  p: {
    display: flex;
    margin-top: 0.3vh;
    color: #000000;
    font-size: 0.4rem;
  }
`;

const Text = styled.text`
  .surfing {
    display: flex;
    color: black;
    // background: #9ADBF1;
    margin-left: 0.5vw;
    margin-top: 0.15vh;
    margin-bottom: 0.15vh;
    font-size: 0.9rem;
    font-family: "Gulim";
    font-weight: bold;
  }
`;

const Surfing = ({curLogin, curName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { list: friendlist } = useSelector((state) => state.friendlist);
  const friendlistRef = useRef();
  const location = useLocation()
  const history = useHistory();

  function goSurf(item) {
    alert(item + "님의 미니홈피에 방문합니다!");
    if (item === "김윤재") {
      history.push({
        pathname: '/testfor/home',
        state: { curLogin: curLogin, curName: curName}
      })

    } else if (item === "윤영훈") {
      history.push({
        pathname: '/wodlxosxos/home',
        state: { curLogin: curLogin, curName: curName}
      })
    }
  }

  return (
    <Wrapper>
      <ToggleHeader>
        <Text>
          <span className="surfing">★일촌 파도타기</span>
        </Text>
        <ToggleButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </ToggleButton>
      </ToggleHeader>
      <FriendList ref={friendlistRef} isOpen={isOpen}>
        {friendlist.map((item, index) => (
          <Li key={index} data-title={item}>
            <a onClick={() => goSurf(item)} target="_blank">
              <Button>
                <p>{item}</p>
              </Button>
            </a>
          </Li>
        ))}
      </FriendList>
    </Wrapper>
  );
};

export default Surfing;
