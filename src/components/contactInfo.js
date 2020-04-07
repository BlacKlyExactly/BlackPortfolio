import React from 'react';
import styled from 'styled-components';
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
    width: 328px;
    height: 53px;
    display: flex;
    align-items: center;
    margin: 15px 0;
    @media screen and (min-width: 800px) {
        margin: 1.5vw 0;
    }
`;

const Text = styled.span`
    font-size: 19px;
    color: white;
    font-weight: 900;
    @media screen and (min-width: 800px) {
        font-size: 1.771vw;
    }
`;

const Icon = styled.span`
    font-size: 60px;
    margin-right: 20px;
`;

const ContactInfo = ({type, icon, text})=>(
    <Wrapper>
        <Helmet>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
         </Helmet>
        <Icon className={[type, `fa-${icon}`]}/>
        <Text>{text}</Text>
    </Wrapper>
);

export default ContactInfo;