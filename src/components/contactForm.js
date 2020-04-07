import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Form, Field } from 'react-final-form';
import { toast } from 'react-toastify'
import axios from "axios";

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 335px;
    margin-top: 20px;
    @media screen and (min-width: 800px) {
        width: 35.677vw;
        height: 60vh;
    }
`;

const EmailInput = styled.input`
    width: 100%;
    border: none;
    background: transparent;
    border-bottom: 1px solid white;
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 50px;
    padding: 1vw;
    @media screen and (min-width: 800px) {
        margin-bottom: 2vw;
        font-size: 1.5vw
    }
`;

const MessageArea = styled.textarea`
    font-family: "Montserrat";
    width: 100%;
    background: transparent;
    border: 1px solid white;
    color: white;
    font-size: 20px;
    height: 250px;
    padding: 1vw;
    font-weight: 700;
    @media screen and (min-width: 800px) {
        height: 18.177vw;
        margin-bottom: 1vw;
        font-size: 1.3vw;
    }
    resize: none;
`;

const Buttons = styled.div`
    width: 106.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    @media screen and (min-width: 1300px) {
        flex-direction: row;
    }
    ./* g-recaptcha{
        margin-top: 20px;
        @media screen and (min-width: 800px) {
            margin-top: 1vw;
        }
    } */
`

const SendMessage = styled.button`
    margin-top: 15px;
    width: 255px;
    height: 66px;
    position: relative;
    border: none;
    background: transparent;
    font-size: 25px;
    color: white;
    font-weight: 900;
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
        left: 0%;
        top: 10%;
    }
    &:before{
        transition: opacity 0.2s;
        background: #FFFFFF;
        z-index: 2;
    }
    &:after{
        transition: transform 0.2s;
        background: #3D5AF1;
        z-index: 1;
        transform: translate(10%, 10%);
    }
    @media screen and (min-width: 800px) {
        padding-left: 1vw;
        height: 4.5vw;
        font-size: 1.5vw;
        margin-left: 3vw;
        &:before, &:after{
            width: 3vw;
            height: 3vw;
        }
    }
`;

const ContactForm = ()=> {
    const EmailField = ({ input, meta, ...rest }) => (
        <EmailInput 
            type="email"
            placeholder="Email"
            {...rest}
            {...input}
        />
    )
    
    const MessageField = ({ input, meta, ...rest }) => (
        <MessageArea 
            {...rest}
            {...input}
        />
    )

    const onMessageSubmit = async({ email, message }) => {
        const isCaptchaChecked = grecaptcha.getResponse().length > 0 ? true : false;
        if(!email){
            toast.error("Podaj email!");
            return;
        }
        if(!message){
            toast.error("Podaj wiadomość!");
            return;
        }
        if(!isCaptchaChecked){
            toast.error("Zaznacz captche!");
            return;
        }
    
        try {
            const { GATSBY_AUTH_USER, GATSBY_AUTH_PASSWORD } = process.env;
            const url = 'http://localhost:3149/sendMail'
            const response = await axios.get(`${url}?email=${email}&message=${message}`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            },{
                auth:{
                    username: GATSBY_AUTH_USER,
                    password: GATSBY_AUTH_PASSWORD
                }
            })
            await toast.success('Pomyślnie wysłano wiadomość!');
        } catch (error) {   
            console.log(error);
            toast.error('Nie udało się wysłać wiadomości!');
        }
    }

    return(
        <Form
            onSubmit={onMessageSubmit}
            render={({ handleSubmit, form, submitting, pristine, values })=> (
                <Wrapper onSubmit={handleSubmit}>
                    <Helmet>
                        <script src="https://www.google.com/recaptcha/api.js?hl=pl" async defer></script>
                    </Helmet>
                    <Field
                        component={EmailField}
                        name="email"
                        hintText="Email"
                        floatingLabelText="Email"
                    />
                    <Field
                        component={MessageField}
                        name="message"
                        hintText="Wiadomość"
                        floatingLabelText="Wiadomość"
                    />
                    <Buttons>
                        <div 
                            className="g-recaptcha" 
                            data-sitekey={process.env.GATSBY_CAPTCHA}
                            data-theme="dark"
                        />
                        <SendMessage>Wyślij</SendMessage>
                    </Buttons>
                </Wrapper>
            )}
        />
    )
}

export default ContactForm;