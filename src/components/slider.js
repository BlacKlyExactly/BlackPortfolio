import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styled from "styled-components";
import gsap from "gsap";

const Wrapper = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 80%;
    @media screen and (min-width: 800px) {
        transform: rotate(90deg);
        left: -2%;
        top: 50%;
        width: 200px;
    }
    z-index: 10;
`;   

const Line = styled.span`
    width: 200px;
    height: 1px;
    background: white;
    @media screen and (min-width: 800px) {
        width: 300px;
    }
`;

const Dots = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const Dot = styled.div`
    &:hover{
        opacity: 0.5;
    }
    height: 21px;
    width: 21px;
    border-radius: 50vw;
    background: white;
    margin: 0px 9px;
    transition: 0.2s;
    transition-property: opacity background;
    &.active{
        background: #3D5AF1;
    }
    cursor: pointer;
    @media screen and (min-width: 800px) {
        height: 27px;
        width: 27px;
        margin: 0px 13px;
    }
`

   const Slider = ({ setSlideState, nextTransition, slideState })=> {
       const line = useRef(0);
       const dots = useRef(0); 
       
       useEffect(()=>{
            const tl = gsap.timeline(); 
            const dotsCollection = dots.current.childNodes;
            const interval = setInterval(()=> {
                const nextSlide = slideState === 2 ? 0 : slideState + 1;
                dotsCollection.forEach(dot=> {
                    dot.classList.remove('active');
                    tl.from(dotsCollection[nextSlide], 0.2, { scale: 1 });
                });
                dotsCollection[nextSlide].classList.add('active'); 
                tl.from(dotsCollection[nextSlide], 0.2, { scale: 0.5 })
                nextTransition().then(() => {
                    setSlideState(nextSlide);
                    tl.from(dotsCollection[nextSlide], 0.2, { scale: 1 })
                });
            }, 6000);

            return () => clearInterval(interval);
       }, [setSlideState, slideState]);

       useLayoutEffect(()=> {
        const dotsCollection = dots.current.childNodes;
        const lineElement = line.current;

        const tl = gsap.timeline({ delay: 0.6 }); 
        tl.from(lineElement, 0.5, { width: 0 })
            .staggerFrom(dotsCollection, 0.15, { opacity: 0 }, 0.1);
       }, []);
    
       const changeSlide = index => {
            const tl = gsap.timeline();
            const dotsCollection = dots.current.childNodes;
            const lineElement = line.current;
            dotsCollection.forEach(dot=> dot.classList.remove('active'));
            dotsCollection[index].classList.add('active'); 
            tl.from(dotsCollection[index], 0.2, { scale: 0.1 })
            nextTransition().then(() => {
                setSlideState(index);
                tl.from(dotsCollection[index], 0.2 , { scale: 1 })
            });
       }

       const dotsArr = [ 0, 1, 2 ];

       return(
        <Wrapper>
            <Line ref={line}/>
            <Dots ref={dots}>
                {dotsArr.map(dot=>{
                    if(dotsArr[slideState] === dot)
                     return <Dot className='active' key={dot} onClick={()=> changeSlide(dot)}/>
                   
                   else
                     return <Dot key={dot} onClick={()=> changeSlide(dot)}/>
                })}
            </Dots>
        </Wrapper>
       )
   };

   export default Slider;