import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  receiveArtistError,
  receiveArtistInfo,
  requestArtistInfo,
} from "../../actions";

import App from "./App";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const artistInfo = useSelector((state) => state.artist.currentArtist);
  const otherInfo = useSelector((state) => state.artist);
  let { id } = useParams();

  const getInfo = async () => {
    try {
      await dispatch(requestArtistInfo());
      const data = await fetchArtistProfile(accessToken, id);
      await dispatch(receiveArtistInfo(data));
    } catch (err) {
      await dispatch(receiveArtistError());
    }
  };

  const numberShorten = (num) => {
    const splitNum = num.toString().split("");
    console.log(splitNum.length);
    switch (splitNum.length) {
      case 1 || 2 || 3:
        return num;
      case 4:
        return `${splitNum[0]}.${splitNum[1]}K`;
      case 5:
        return `${splitNum[0]}${splitNum[1]}.${splitNum[2]}K`;
      case 6:
        return `${splitNum[0]}${splitNum[1]}${splitNum[2]}K`;
      case 7:
        return `${splitNum[0]}.${splitNum[1]}M`;
      case 8:
        return `${splitNum[0]}${splitNum[1]}.${splitNum[2]}M`;
      case 9:
        return `${splitNum[0]}${splitNum[1]}${splitNum[2]}M`;
      default:
        return;
    }
  };

  useEffect(() => {
    getInfo();
  }, [accessToken]);

  useEffect(() => {}, [artistInfo]);

  return (
    <Wrapper>
      {artistInfo && (
        <>
          {console.log(otherInfo)}{" "}
          <MainPicture
            src={artistInfo.profile.images[0].url}
            alt=""
          ></MainPicture>
          <NameHeader>{artistInfo.profile.name}</NameHeader>
          <NumFollowers>
            <Num>{numberShorten(artistInfo.profile.followers.total)}</Num>{" "}
            followers
          </NumFollowers>
          <TagsText>tags</TagsText>
          <GenreDiv>
            {artistInfo.profile.genres.map((genre, index) => {
              if (index > 1) return;
              return (
                <GenreBox>
                  <Genre key={(genre, index)}>{genre}</Genre>
                </GenreBox>
              );
            })}
          </GenreDiv>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #0b0f14;
  height: 100%;
  min-height: 100vh;
  color: white;
`;

const MainPicture = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  position: absolute;
  top: 59px;
  left: 90px;
`;

const NameHeader = styled.h1`
  position: absolute;
  top: 173px;
  left: 76px;
  font-weight: 700;
  font-size: 56px;
  line-height: 58.51px;
  text-shadow: 4px 8px 25px 0px #000000;

  text-shadow: 0px 4px 4px 0px #000000 50%;

  text-shadow: 1px 2px 2px 0px #000000 75%;
`;

const NumFollowers = styled.p`
  position: absolute;
  font-weight: 600;
  font-size: 14px;
  top: 257px;
  left: 132px;
  font-family: Montserrat;
`;

const Num = styled.span`
  color: #ff4fd8;
`;

const TagsText = styled.p`
  position: absolute;
  font-size: 21px;
  font-weight: 600;
  top: 360px;
  left: 160px;
`;

const GenreDiv = styled.div`
  position: absolute;
  top: 400px;
  width: 100%;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GenreBox = styled.div`
  width: 144px;
  height: 29px;
  text-align: center;
  border-radius: 4px;
  background: #4b4b4b 40%;
`;

const Genre = styled.span`
  font-size: 21px;
  font-weight: 600;
`;

export default ArtistRoute;
