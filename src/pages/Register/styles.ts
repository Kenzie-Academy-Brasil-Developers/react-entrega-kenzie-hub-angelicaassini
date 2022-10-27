import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 16px;
    margin: 0 auto;

`

export const StyledRegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 370px;
    height: 890px;
   
    justify-content: space-between;
    padding: 42px 0 28px 0;

    background: var(--Grey-3);
    box-shadow: 0px 4px 40px -10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    font-family: 'Inter';

    .title{
       h1{
            font-weight: 700;
            font-size: 18px;
            color: var(--Grey-0);
            padding-left: 22px;
        }

        h3{
            padding-top: 22px;
            font-weight: 400;
            font-size: 12px;
            color: var(--Grey-1);

            padding-left: 22px;
        }
    }

    label{
        font-weight: 400;
        font-size: 12px;
        color: var(--Grey-0);
        text-align: left;
        padding-left: 22px;
    }

    input, select{

        width: 330px;
        height: 48px;
        background: var(--Grey-2);
        border: 1px solid var(--Grey-2);
        border-radius: 4px;

        color: var(--Grey-1);

        margin: 0 auto;

        padding-left: 22px;

        @media screen and (max-width: 375px){
            width: 90%;
            justify-content: center;
        }

    }

    button{
        width: 326px;
        height: 48px;
        margin: 0 auto;

        background: var(--button-primary-negative);
        border: 1px solid var(--button-primary-negative);
        border-radius: 4px;

        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;

        @media screen and (max-width: 375px){
            width: 90%;
            justify-content: center;
        }
    }

    p{
        font-size: 14px;
        color: red;
        padding-left: 22px;
    }
`