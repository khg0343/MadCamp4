import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';
import Modal from '../../Modal/Modal';

const Wrapper = styled.div`
  margin: 10px;
  background: #eee;
`;

const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    font-weight: bold;
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  cursor: pointer;
`;

const ToggleContent = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  padding-top: 10px;
`;

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Wrapper>
        <ToggleHeader>
          <h2>편집</h2>
          <ToggleButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </ToggleButton>
        </ToggleHeader>
        <ToggleContent isOpen={isOpen}>
          {/* <PaletteTab
            target={target}
            setTarget={setTarget}
            setHexColor={setHexColor}
          />
          <Palette
            target={target}
            hexColor={hexColor}
            setHexColor={setHexColor}
          /> */}
        </ToggleContent>
      </Wrapper>
    );
};

export default React.memo(EditProfile);