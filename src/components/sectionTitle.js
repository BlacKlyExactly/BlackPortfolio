import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

const Wrapper = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 30px 0px;
    @media screen and (min-width: 800px) {
        height: 11vw;
        flex-direction: row;
        margin: 0;
    }
`;

const SectionName = styled(motion.div)`
    font-weight: 800;
    font-size: 30px;
    &:nth-child(2){
        display: none;
    }
    @media screen and (min-width: 800px) {
        font-size: 3.594vw; 
        &:nth-child(2){
            display: inherit;
        }
    }
`;

const LeftSquare = styled(motion.span)`
    position: absolute;
    width: 66px;
    height: 66px;
    background: #3D5AF1;
    left: 0;
    top: 0;
    @media screen and (min-width: 800px) {
        width: 11vw;
        height: 11vw;
    }
`;

const RightSquare = styled(motion.span)`
    position: absolute;
    width: 66px;
    height: 66px;
    background: white;
    right: 0;
    top: 0;
    @media screen and (min-width: 800px) {
        width: 11vw;
        height: 11vw;
    }
`;

const Spliter = styled(motion.span)`
    display: none;
    @media screen and (min-width: 800px) {
        display: inherit;
        width: 5vw;
        height: 5vw;
        background: #3D5AF1;
        transform: rotate(45deg);
        margin: 0vw 4.5vw;    
    }
`;

const LeftSquareVariants = {
    enter: {
        x: 0
    },
    exit: {
        x: "-100%"
    }
}

const RightSquareVariants = {
    enter: {
        x: 0
    },
    exit: {
        x: "100%"
    }
}

const SpliterVariants = {
    enter: {
        rotate: 135,
        opacity: 1
    },
    exit: {
        rotate: 45,
        opacity: 0
    }
}

const SectionNameVariants = {
    enter: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

const SectionTitle = ({ title })=> {
    const [ sectionVisibility, setSectionVisibility ] = useState(false);
    const animate = sectionVisibility ? "enter" : "exit";
    return(
        <VisibilitySensor onChange={isVisible => setSectionVisibility(isVisible)}>
            <Wrapper>
                <LeftSquare 
                    animate={animate}
                    variants={LeftSquareVariants}
                />
                <SectionName
                    animate={animate}
                    variants={SectionNameVariants}
                >
                    {title.toUpperCase()}
                </SectionName>
                <Spliter
                    animate={animate}
                    variants={SpliterVariants}
                />
                <SectionName
                    animate={animate}
                    variants={SectionNameVariants}
                >
                    {title.toUpperCase()}
                </SectionName>
                <RightSquare
                    animate={animate}
                    variants={RightSquareVariants}
                />
            </Wrapper>
        </VisibilitySensor>
    )
}

export default SectionTitle;

