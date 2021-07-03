import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const primaryColor = "#4bbe61";

const sharedDisplayStyles = `
display: flex;
align-items: center;
justify-content: center;
`;


const hideRightWing = keyframes`
  100%{
    transform: rotate(0deg);
    opacity: 0;
  }
`;

const showSector = keyframes`
  100%{visibility: visible};
`

const sharedSectorStyles = css`
position: absolute;
height: 100%;
width: 100%;
background-color: ${primaryColor};
clip-path:circle(50% at 0% 0%);
visibility: hidden;
animation: ${showSector} 0.6s forwards;
`
const animateArrowStyles = css`
  transform: translateY(-20px);
  transition: transform 0.5s;
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
  background-color: #32333e;
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
  `
  const Sector2 = styled.span`
  ${sharedSectorStyles}
  transform: translate(50%, 50%);
  animation-delay: 0.2s;
  `
  const Sector3 = styled.span`
  ${sharedSectorStyles}
  transform: translate(-50%, 49%) rotate(90deg);
  animation-delay: 0.4s;
  `

  const Sector4 = styled.span`
  ${sharedSectorStyles}
  transform: translate(-50%, -50%) rotate(-180deg);
  animation-delay: 0.6s;
  `

const WhiteCircle = styled.div`
  height: 20px;
  width: 20px;
  background-color: #fff;
  border-radius: 100%;
  z-index: 10;
`;

const DownloadButton = () => {
  const [isDownloading, setisDownloading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isArrowHidden, setIsArrowHidden] = useState(false);

  const handleClick = () => {
    setisDownloading(true);
    setTimeout(() => setIsArrowHidden(true), 
    800);
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
          <WhiteCircle />
        </InnerCircle>
      </OuterCircle>
      <Text>{isDownloading ? "Downloading..." : "Download"}</Text>
    </Wrapper>
  );
};

export default DownloadButton;
