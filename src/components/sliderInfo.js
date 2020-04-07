import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const Wrapper = styled.div`
    display: none;
    @media screen and (min-width: 800px) {
        display: inherit;
        position: absolute;
        height: 4.219vw ;
        width: 36.823vw;
        background: #3D5AF1;
        transform: rotate(-90deg);
        left: 49.2vw;
        z-index: 10;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row-reverse;
    }
`;

const Slide = styled.span`
    font-size: 2.031vw;
    font-weight: 300;
    margin: 0 2vw;
`;

const Name = styled.span`
    font-size: 1.563vw;
    font-weight: 300;
    margin: 0 2vw;
`

const Line = styled.span`
    width: 13.245vw;
    height: 0.05vw;
    background: white;
`;

const SliderInfo = ({slide})=> {
    const wrapper = useRef(0);

    useEffect(()=>{
        const [ slide, line, name ] = wrapper.current.childNodes;
        const wrapperElement = wrapper.current;

        const tl = gsap.timeline({ delay: 0.6 });
        tl.from(wrapperElement, 0.2, { opacity: 0 })
            .from(slide, 0.2, { opacity: 0 })
            .from(line, 0.2, { width: 0 })
            .from(name, 0.2, { opacity: 0 })
    }, [])

    return(
        <Wrapper ref={wrapper}>
            <Slide>0{slide + 1}</Slide>
            <Line/>
            <Name>SLIDE</Name>
        </Wrapper>
    )
};

export default SliderInfo;