import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const primaryColor = "#FEDF4D";

//animations
const hideRightWing = keyframes`
  100%{
    transform: rotate(0deg);
    opacity: 0;
  }
`;

const showSector = keyframes`
  100%{visibility: visible};
`;

const dash = keyframes`
100% {stroke-dashoffset: 0;}
`;

//Common styles
const sharedDisplayStyles = `
display: flex;
align-items: center;
justify-content: center;
`;

const sharedSectorStyles = css`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${primaryColor};
  clip-path: circle(50% at 0% 0%);
  visibility: hidden;
  animation: ${showSector} 1s forwards linear;
`;

const animateArrowStyles = css`
  transform: translateY(-20px);
  &:before,
  &:after {
    animation: ${hideRightWing} 0.8s forwards;
  }
`;

const showInnerCircle = css`
  ${sharedDisplayStyles}
`;

const Wrapper = styled.div`
  ${sharedDisplayStyles}
  flex-direction: column;
`;

const Text = styled.span`
  color: #fafafa;
  font-size: 25px;
  margin-top: 20px;
`;

const OuterCircle = styled.div`
  height: 150px;
  width: 150px;
  background-color: transparent;
  border: 10px solid ${primaryColor};
  border-radius: 100%;
  cursor: pointer;
  ${sharedDisplayStyles}
`;

const DownArrow = styled.div`
  height: 50%;
  width: 7px;
  background-color: ${primaryColor};
  border-radius: 4px;
  position: relative;
  &:before,
  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    height: 60%;
    width: 100%;
    background-color: ${primaryColor};
    border-radius: inherit;
    transform-origin: center bottom;
    transform: rotate(50deg);
  }
  &:before {
    right: 2px;
  }
  &:after {
    left: 2px;
    transform-origin: center bottom;
    transform: rotate(-50deg);
  }
  ${({ shouldAnimate }) => shouldAnimate && animateArrowStyles}
`;

const InnerCircle = styled.div`
  display: none;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  border-radius: 100%;
  background-color: transparent;
  ${({ isVisible }) => isVisible && showInnerCircle}
  position: relative;
`;

const Sector1 = styled.span`
  ${sharedSectorStyles}
  transform: translate(50%, -50%) rotate(-90deg);
`;
const Sector2 = styled.span`
  ${sharedSectorStyles}
  transform: translate(50%, 50%);
  animation-delay: 0.2s;
`;
const Sector3 = styled.span`
  ${sharedSectorStyles}
  transform: translate(-50%, 50%) rotate(90deg);
  animation-delay: 0.4s;
`;

const Sector4 = styled.span`
  ${sharedSectorStyles}
  transform: translate(-50%, -50%) rotate(-180deg);
  animation-delay: 0.6s;
`;

const WhiteCircle = styled.div`
  height: 20px;
  width: 20px;
  z-index: 10;

  background-color: #fff;
  border-radius: 100%;
`;

const TickIcon = styled.svg`
  fill: none;
  z-index: 10;
  & path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${dash} 5s linear forwards;
  }
`;
const DownloadButton = () => {
  const [isDownloading, setisDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isArrowHidden, setIsArrowHidden] = useState(false);

  const handleClick = () => {
    setisDownloading(true);
    setTimeout(() => {
      setIsArrowHidden(true);
      setTimeout(() => {
        setisDownloading(false);
        setIsDownloaded(true);
      }, 1000);
    }, 800);
  };
  return (
    <Wrapper>
      <OuterCircle onClick={handleClick}>
        {!isArrowHidden && <DownArrow shouldAnimate={isDownloading} />}
        <InnerCircle isVisible={isArrowHidden}>
          <Sector1 />
          <Sector2 />
          <Sector3 />
          <Sector4 />
          {isDownloading ? (
            <WhiteCircle />
          ) : (
            <TickIcon
              width="48"
              height="52"
              viewBox="0 0 38 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18.902L12.6808 34L34 4"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </TickIcon>
          )}
        </InnerCircle>
      </OuterCircle>
      {isDownloaded ? (
        <Text>Downloaded!</Text>
      ) : (
        <Text>{isDownloading ? "Downloading..." : "Download"}</Text>
      )}
    </Wrapper>
  );
};

export default DownloadButton;
