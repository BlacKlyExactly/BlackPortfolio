import React, { useRef, useState, useLayoutEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import gsap from "gsap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { motion, useAnimation } from "framer-motion";
import VisiblitySensor from "react-visibility-sensor";

import Slider from "../components/slider";
import SliderInfo from "../components/sliderInfo";
import SectionTitle from "../components/sectionTitle";
import ContactInfo from "../components/contactInfo";
import Gallery from "../components/gallery";
import Nav from "../components/nav";
import ContactForm from "../components/contactForm";

const Global = createGlobalStyle`
  @font-face {
    font-family: "Montserrat";
    src: 
      url('./assets/fonts/Montserrat-Regular') format("truetype"),
      url('./assets/fonts/Montserrat-Bold') format("truetype"),
      url('./assets/fonts/Montserrat-ExtraBold') format("truetype"),
      url('./assets/fonts/Montserrat-ExtraLight') format("truetype"),
  } 
  body, html{
    margin: 0;
    font-family: "Montserrat";
    .ti-cursor{
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 300 !important;
      margin: 0 !important;
    }
  }
  .secondPart{
    color: #3D5AF1;
    text-decoration: underline;
  }
  @media screen and (min-width: 1000px) {
    ::-webkit-scrollbar {
      width: 5px;
      height: 100%;
    }
    ::-webkit-scrollbar-thumb {
      background: #3d5af1;
      border: 0px none #ffffff;
      border-radius: 53px;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #3d5af1;
    }
    ::-webkit-scrollbar-track {
      background: #004646;
      border: 0px none #ffffff;
      border-radius: 69px;
    }
    ::-webkit-scrollbar-track:active {
      background: #333333;
    }
    ::-webkit-scrollbar-corner {
      background: transparent;
    }
  }
`

const Wrapper = styled.main`
  width: 100%;
  overflow: hidden;
  background: #0C0B0D;
  color: white;
`;

const Landing = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media screen and (min-width: 800px) {
      justify-content: flex-start;
  }
  /* overflow: hidden; */
`;

const LandingBackgrounds = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`
const LandingBackground = styled.div`
    transition-property: transform scale;
    background: url(${props=> props.image});
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    &.active{
      opacity: 1;
    }
    transition: 0.2s;
    @media screen and (min-width: 1000px) {
      background-attachment: fixed;
    }
`;

const LandingDecor = styled(motion.span)`
  display: flex;
  align-items: center;
  font-size: 200px;
  opacity: 0.1;
  width: 1000px;
  position: absolute;
  height: 570px;
  font-weight: 800;
  left: -14%;
  z-index: 1;
  @media screen and (min-width: 800px) {
      width: 80vw;
      font-size: 15vw;
      left: 12%;
  }
`;

const LandingContent = styled.div`
  position: relative;
  width: 328px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  @media screen and (min-width: 800px) {
      width: 30vw;
      left: 15vw;
  }
`;

const LandingContentTitle = styled(motion.span)`
  display: flex;
  white-space: pre;
  font-size: 45px;
  font-weight: bold;
  @media screen and (min-width: 800px) {
      font-size: 3.7vw;
  }
`;

const LandingPageContentDescription = styled(motion.span)`
  font-size: 15px;
  line-height: 30px; 
  color: #CCCCCC;
  width: 298px;
  margin-top: 20px;
  @media screen and (min-width: 800px) {
      font-size: 1.6vw;
      width: 36vw;
      line-height: 2.7vw;
  }
`;

const Content = styled.main`
  width: 100%;
  position: relative;
  margin-bottom: 5vw;
  @media screen and (min-width: 800px) {
    margin-bottom: 0vw;
  }
`;

const Section = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-child{
    height: 43.1vw;
    @media screen and (min-width: 800px) {
      flex-direction: row;
      align-items: center;
    }
  }
  @media screen and (min-width: 800px) {
    align-items: inherit;
    justify-content: center;
  }
`;

const ContactInfos = styled(motion.div)`
  display: flex;
  width: 100%;
  align-items: center;
  height: 50%;
  margin-top: 50px;
  flex-direction: column;
  height: 550px;
  @media screen and (min-width: 800px) {
    margin-top: 0;
    width: 20vw;
    margin-right: 15vw;
    justify-content: center;
    align-items: flex-start;
  }
`;

const contactInfosVariants = {
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
}

const contactInfoVariants = {
  enter: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: -10,
    opacity: 0
  }
}

const IndexPage = () => {
  const content = useRef(0);
  const decor = useRef(0);
  const landingBackgrounds = useRef(0);

  const changeTitle = useAnimation();
  const changeDescription = useAnimation();
  const changeDecor = useAnimation();
  
  const [ slideState, setSlideState ] = useState(1);
  const [ contactState, setContactState ] = useState(false);
  const [ portfolioState, setPortfolioState ] = useState(false);

  const titlesNoFormat = [
    "Frontend Dev",
    "React Noob",
    "JQuery master"
  ];

  const titles = [
    <>Frontend <span className="secondPart">Dev</span></>,
    <>React <span className="secondPart">Noob</span></>,
    <>JQuery <span className="secondPart">Master</span></>
  ];

  useLayoutEffect(()=>{
    const contentElements = content.current.childNodes;
    const decorElement = decor.current;
    const backgroundsElement = landingBackgrounds.current;

    const tl = gsap.timeline({ delay: 0.6 });
    tl.from(backgroundsElement, 0.2, { opacity: 0 })
      .staggerFrom(contentElements, 0.2, { x: -10, opacity: 0 })
      .from(decorElement, 0.2,  {y: -10, opacity: 0 });
  }, [])

  const backgrounds = [
    require('../assets/bg-mobile.png'),
    require('../assets/bg2-mobile.png'),
    require('../assets/bg3-mobile.png')
  ];

  const nextTransition = async () => {
      await changeTitle.start({
          y: -10,
          opacity: 0
      })
      await changeDescription.start({
          y: -10,
          opacity: 0
      })
      await changeDecor.start({
          y: -10,
          opacity: 0
      })
      return new Promise(async ( resolve, reject ) => {
          resolve();
          await changeTitle.start({
            y: 0,
            opacity: 1
          })
          await changeDescription.start({
            y: 0,
            opacity: 1
          })
          await changeDecor.start({
            y: 0,
            opacity: 0.1
          })
      });
  }

  const contactInfosAnimate = contactState ? "enter" : "exit";
  const portfolioAnimate = portfolioState ? "enter" : "exit";

  return(
      <Wrapper>
        <ToastContainer/>
        <Nav/>
        <Global/>
        <Landing data-relative-input="true">
          <LandingBackgrounds ref={landingBackgrounds}>
              {backgrounds.map(background => {
                if(backgrounds[slideState] === background)
                  return <LandingBackground key={background} image={background} className='active'/>
                
                else
                  return <LandingBackground key={background} image={background}/>  
              })}
          </LandingBackgrounds>
          <LandingContent ref={content}>
            <LandingContentTitle animate={changeTitle}>
              {<>{titles[slideState]}</>}
            </LandingContentTitle>
              <LandingPageContentDescription animate={changeDescription} >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in lobortis mi. Sed tristique efficitur erat. In sit amet tristique dolor.
              </LandingPageContentDescription>
          </LandingContent>
            <LandingDecor ref={decor} animate={changeDecor}>{titlesNoFormat[slideState]}</LandingDecor>  
          <Slider setSlideState={setSlideState} nextTransition={nextTransition} slideState={slideState}/>
          <SliderInfo slide={slideState}/>         
        </Landing>
        <Content>
           <SectionTitle title="Portfolio"/>   
            <Section>
              <VisiblitySensor intervalDelay={10} onChange={isVisible => {
                if(isVisible) setPortfolioState(isVisible)
              }}>
                  <Gallery animate={portfolioAnimate}/> 
              </VisiblitySensor>
            </Section>
            <SectionTitle title="Kontakt"/>   
            <VisiblitySensor intervalDelay={10} onChange={isVisible => {
              if(isVisible) setContactState(isVisible)
            }}>
                <Section>
                  <ContactInfos animate={contactInfosAnimate} variants={contactInfosVariants}>
                      <ContactInfo 
                        icon="envelope" 
                        variants={contactInfoVariants}
                        text={
                          <>supreme24d<span className='secondPart'>@gmail.com</span></>
                        } 
                        type="fas"
                      />
                      <ContactInfo 
                        icon="github" 
                        text="BlacKlyExactly" 
                        type="fab" 
                        variants={contactInfoVariants}
                      />
                      <ContactInfo 
                        icon="linkedin"
                        text="Not Yet" 
                        type="fab"
                        variants={contactInfoVariants}
                      />
                  </ContactInfos>
                  <ContactForm animate={contactInfosAnimate}/>
              </Section>
            </VisiblitySensor>
        </Content>
      </Wrapper>
  )
}

export default IndexPage;
