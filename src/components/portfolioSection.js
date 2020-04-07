import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

const Wrapper = styled.div`
    position: relative;
    z-index: 5;
    height: 460px;
    width: 338px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 800px) {
        width: 100%;
        height: 39.531vw;
        flex-direction: row;
        justify-content: flex-start;
        &:nth-child(odd){
            flex-direction: row-reverse;
        }
    }
`;

const Image = styled.div`
    position: relative;
    background: #364ECF;
    width: 338px;
    height: 193px;
    z-index: 5;
    @media screen and (min-width: 800px) {
        width: 67.344vw;
        height: 100%;
    }
    &:before{
        background: url(${props=> props.image});
        background-size: cover;
        position: absolute;
        content: "";
        width: 97%;
        height: 97%;
        left: 1.5%;
        top: 1.5%;
        opacity: 1;
    }
`;

const Content = styled.div`
    width: 325px;
    height: 238px;
    background: #202023;
    @media screen and (min-width: 800px) {
        width: 32.656vw;
        height: 36.042vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

const ContentDescription = styled.div`
    font-size: 15px;
    line-height: 30px;
    color: #CCCCCC;
    width: 298px;
    margin-top: 20px;
    margin-left: 30px;
    @media screen and (min-width: 800px) {
        font-size: 1.563vw;
        line-height: 2.604vw;
        width: 28.281vw;
        margin-left: 0;
    }
`;

const ContentTitle = styled.div`
  font-size: 31px;
  font-weight: 800;
  margin-top: 30px;
  margin-left: 30px;
  @media screen and (min-width: 800px) {
    font-size: 3.125vw;
    margin-left: 0;
  }
`;

const PortfolioSection = ({ image, title, description }) => (
    <Wrapper>
        <Image image={image}></Image>
        <Content>
            <ContentTitle>{title}</ContentTitle>
            <ContentDescription>{description}</ContentDescription>
        </Content>
    </Wrapper>
);

export default PortfolioSection;