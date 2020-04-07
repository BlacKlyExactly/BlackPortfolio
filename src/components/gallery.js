import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

const Wrapper = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1A1A1C;
    padding: 50px 0vw;
    margin-top: 50px;
    margin-bottom: 50px;
    transform-origin: left;
   
`;

const Images = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    @media screen and (min-width: 1000px) {
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`;

const Image = styled(motion.div)`
    position: relative;
    width: 328px;
    height: 192px;
    background: #3D5AF1;
    margin: 12px 0px;
    cursor: pointer;
    @media screen and (min-width: 1000px) {
        width: 28.438vw;
        height: 16.719vw;
        margin: 1vw;
    }
    &:before{
        content: "";
        position: absolute;
        width: 97%;
        height: 97%;
        left: 0%;
        top: 0%;
        transform: translate(-1%, -2%);
        background: url(${props=> props.image});
        background-size: cover;
        transition: transform 0.2s;
    }
    &:hover{
        &:before{
            transform: translate(0%, 0%);
        }
    }
`;

const LoadMoreButton = styled.button`
    margin-top: 10px;
    width: 285px;
    height: 66px;
    position: relative;
    border: none;
    background: transparent;
    font-size: 25px;
    color: white;
    font-weight: 900;
    text-align: right;
    cursor: pointer;
    transition: color 0.2s;
    &:hover{
        &:after{
            transform: translate(0%, 0%);
        }
        &:before{
            opacity: 0;
        }
        color: #3D5AF1;
    }
    &:before, &:after{
        content: "";
        height: 60px;
        width: 60px;
        position: absolute;
    }
    &:before{
        transition: opacity 0.2s;
        left: 0;
        top: 0;
        background: #FFFFFF;
        z-index: 2;
    }
    &:after{
        transition: transform 0.2s;
        left: 0%;
        top: 0%;
        background: #3D5AF1;
        z-index: 1;
        transform: translate(10%, 10%);
    }
`;

const WrapperVariants = {
    enter: {
        opacity: 1,
        transition:{
            when: "beforeChildren"
        }
    },
    exit: {
        opacity: 0,
        transition:{
            when: "afterChildren"
        }
    }
}

const ImagesVariants = {
    enter: {
        transition:{
            staggerChildren: 0.1
        }
    },
    exit: {
        transition:{
            staggerChildren: 0.1
        }
    }
};

const ImageVariants = {
    enter: {
       opacity: 1,
    },
    exit: {
        opacity: 0,
    }
};

const Gallery = ()=> {
    const [ imagesState, setImagesState ] = useState(false);
    const animate = imagesState ? "enter" : "exit";

    return(
        <VisibilitySensor 
            onChange={isVisible => {
                if(!imagesState )setImagesState(isVisible)
            }}
            scrollCheck={true}
        >
            <Wrapper
                variants={WrapperVariants}
                animate={animate}
            >
                <Images
                    variants={ImagesVariants}
                    animate={animate}
                >
                    <Image 
                        variants={ImageVariants} 
                        image={require('../assets/example.png')}
                    />
                    <Image
                        variants={ImageVariants} 
                        image={require('../assets/example.png')}
                    />
                    <Image 
                        variants={ImageVariants} 
                        image={require('../assets/example.png')}
                    />
                    <Image
                        variants={ImageVariants} 
                        image={require('../assets/example.png')}
                    />
                    <Image
                        variants={ImageVariants} 
                        image={require('../assets/example.png')}
                    />
                </Images>
                <LoadMoreButton>Załaduj więcej</LoadMoreButton>
            </Wrapper>
        </VisibilitySensor>
    )
};

export default Gallery;