import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Audio } from '../../../utils/utils';
import { setCurSong } from '../../../module/playlist';
import Modal from '../../Modal/Modal';

const Wrapper = styled.div`
  background: #eee;
  margin: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 3px;
  background: darkgrey;
`;

const Title = styled.div`
  margin-left: 5px;
`;

const Setting = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Player = styled.audio`
  height: 10px;
  outline: none;
  &::-webkit-media-controls-panel {
    background: #eee;
  }
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    display: none;
  }
`;

const Button = styled.button`
  margin-right: 15px;
  font-size: 0.7rem;
  cursor: pointer;
`;

const PlayList = styled.ul`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-top: 5px;
  padding: 10px;
  border-radius: 3px;
  background: white; //transparent;
  color: #333;
`;

const Li = styled.li`
  padding: 5px 0;
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
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  &:hover {
    font-weight: bold;
  }
  P:last-of-type {
    margin-top: 3px;
    color: #ccc;
    font-size: 0.6rem;
  }
`;

const PlayButton = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100% !important;
  width: 100% !important;
  border-radius: 10px;
  font-size: 2rem !important;
  cursor: pointer;
  &:hover {
    background: #79aaba;
  }
`;

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { list: miniPlaylist } = useSelector(state => state.playlist);
  const { curSong } = useSelector(state => state.playlist);

  const playerRef = useRef();
  const playlistRef = useRef();
  const audioRef = useRef(); // ???????????? ??????

  const [isOpenModal, setIsOpenModal] = useState(false); // ??????
  const [isOpenList, setIsOpenList] = useState(false); // ????????????
  const handleList = () => setIsOpenList(!isOpenList);

  const handleUserInteraction = () => {
    const audio = audioRef.current;
    if (audio.player.pause) {
      audio.player.play();
    }
    setIsOpenModal(!isOpenModal);
  };

  // ???????????? ?????? ?????????: ????????? + ?????????
  const initCurSong = useCallback(
    (audio, idx) => {
      audio.setCurrentSong(idx, 0);
      dispatch(
        setCurSong({
          idx: audio.idx,
          title: audio.title,
          curTime: 0,
        }),
      );
    },
    [dispatch],
  );

  // ?????? ????????? ??????
  const moveToNextSong = (audio, idx) => {
    initCurSong(audio, idx);
    if (audio.player.pause) {
      audio.player.play(); // ?????? ??????
    }
  };

  // ??? deps: ?????? ?????????, ???????????? ??? ?????? ??????
  useEffect(() => {
    // audio ?????? ??????
    audioRef.current = new Audio(
      playerRef.current,
      playlistRef.current.childNodes,
    );
    const audio = audioRef.current;
    audio.setCurrentSong(curSong.idx, curSong.curTime);

    // ????????? ????????? ??? ?????? ?????? ??????
    const playPromise = audio.player.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        // ?????? ?????? ??????
        if (e.name === 'NotAllowedError') {
          if (!isOpenModal) {
            // ?????? ?????? ?????? ????????? ???????????? ??????
            setIsOpenModal(!isOpenModal);
          }
        }
      });
    }

    // ???????????? ??????
    audio.player.addEventListener('ended', () => {
      let idx = audio.idx;
      idx++;

      if (idx === audio.playlists.length) {
        idx = 0;
      }

      moveToNextSong(audio, idx);
    });

    // ???????????? ??????
    audio.playlists.forEach((item, idx) => {
      item.addEventListener('click', () => {
        moveToNextSong(audio, idx);
      });
    });

    // ??????????????? ??? ?????? ???????????? ??? ?????? ??????
    return () => {
      dispatch(
        setCurSong({
          idx: audio.idx,
          title: audio.title,
          curTime: audio.player.currentTime,
        }),
      );
    };
  }, []);

  // ???????????? ?????????????????? ????????? ???????????? ??????
  useEffect(() => {
    const audio = audioRef.current;
    audio.setCurTime(curSong.curTime);
  }, [curSong.curTime]);

  return (
    <Wrapper>
      {/* <Modal isOpen={isOpenModal} width={100} height={100} bg="lightblue">
        <PlayButton onClick={handleUserInteraction}>????</PlayButton>
      </Modal> */}
      <TitleWrapper>
        ???? <Title>{curSong.title}</Title>
      </TitleWrapper>
      <Setting>
        <Player
          type="audio/mp3"
          controls
          controlsList="nodownload"
          ref={playerRef}
        >
          Your browser does not support the audio element.
        </Player>
        <Button onClick={handleList}>List</Button>
      </Setting>
      <PlayList ref={playlistRef} isOpen={isOpenList}>
        {miniPlaylist.map((item, index) => (
          <Li key={index} data-title={item} isActive={index === curSong.idx}>
            <p>{item.split(' - ')[1]}</p>
            <p>{item.split(' - ')[0]}</p>
          </Li>
        ))}
      </PlayList>
    </Wrapper>
  );
};

export default React.memo(MusicPlayer);
