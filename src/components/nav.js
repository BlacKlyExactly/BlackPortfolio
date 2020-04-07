import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import gsap from "gsap";

const Wrapper = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    height: 80px;
    position: absolute;
    z-index: 100;
    @media screen and (min-width: 800px) {
        height: 6.5vw;
    }
`;

const Brand = styled.div`
    position: relative;
    font-size: 35px;
    font-weight: bold;
    margin-left: 30px;
    cursor: pointer;
    &:before{
        position: absolute;
        content: "";
        width: 26px;
        height: 26px;
        background: #3D5AF1;
        left: -5%;
        top: -5%;
        z-index: -1;
    }
    @media screen and (min-width: 800px) {
        margin-left: 3.5vw;
        font-size: 2.6vw;
    }
    &:after{
        content: "";
        position: absolute;
        width: 100%;
        height: 0.5vw;
        background: #3D5AF1;
        left: 0;
        top: 100%;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform 0.2s;
    }
    &:hover{
        &:after{
            transform-origin: left;
            transform: scaleX(1);
        }
    }
`;

const Selects = styled.ul`
    height: 6.5vw;
    display: flex;
    align-items: center;
    margin-left: auto;
    list-style: none;
`;

const Select = styled.li`
    position: relative;
    display: none;
    cursor: pointer;
    @media screen and (min-width: 800px) {
        display: inherit;
        font-size: 1.6vw;
        margin: 0px 24.5px;
        font-weight: bold;
    }
    &:after{
        content: "";
        position: absolute;
        width: 100%;
        height: 0.2vw;
        background: #3D5AF1;
        left: 0;
        top: 100%;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform 0.2s;
    }
    &:hover{
        &:after{
            transform-origin: left;
            transform: scaleX(1);
        }
    }
`;

const Nav = () => {
    const brand = useRef(0);
    const selects = useRef(0);
    const nav = useRef(0);

    useLayoutEffect(()=>{
        const tl = gsap.timeline({ delay: 0.6 }); 
        tl.from(brand.current, 0.2, { opacity: 0, ease: "Power2.easeInOut" })
            .staggerFrom(selects.current.childNodes, 0.5, { X: -10, opacity: 0, ease: "Power2.easeInOut" }, 0.1);
    }, [])

    return(
        <Wrapper ref={nav}>
            <Brand ref={brand}>Black</Brand>
            <Selects ref={selects}>
                <Select>Select</Select>
                <Select>Select</Select>
                <Select>Select</Select>
            </Selects>
        </Wrapper>
    )
};

export default Nav;