import styled from "styled-components";

export const Container = styled.div`
width: 100%;
height: 720px;
max-width: 1200px;
padding: 16px;
background: var(--Grey-4);
display: flex;
flex-direction: column;
margin: 0 auto;

header{
        width: 100%;
        height: 118px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: var(--Grey-4);

        p{
            font-weight: 700;
            font-size: 18px;
            color: var(--Grey-0);
        }

        span{
            font-weight: 400;
            font-size: 12px;
            color: var(--Grey-1);
        }
    }

`
export const StyledNav = styled.nav`
    width: 100%;
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    background-color: var(--Grey-4);

    img{
        width: 100px;

    }

    button{
        width: 55px;
        height: 32px;
        background: var(--Grey-3); 
        border: 1px solid var(--Grey-3);
        border-radius: 4px;
        margin: 0 auto;

        font-weight: 600;
        font-size: 12px;
        color: var(--Grey-0);
    }
`

export const StyledTechs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 370px;
    height: 502px;
   
    justify-content: space-between;
    padding: 42px 0 28px 0;

    background: var(--Grey-3);
    box-shadow: 0px 4px 40px -10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    font-family: 'Inter';

    .h2{
        font-weight: 700;
        font-size: 18px;
        color: var(--Grey-0);
        padding-top: 42px;
        }

    label{
        font-weight: 400;
        font-size: 12px;
        color: var(--Grey-0);
        text-align: left;
        padding-left: 22px;
    }

    input{

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

    p{
        color: red;
    }

    button{
        width: 326px;
        height: 48px;
        background: var(--button-primary-negative); 
        
        border: 1px solid var(--button-primary-negative);
        border-radius: 4px;
        margin: 0 auto;

        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;

        @media screen and (max-width: 375px){
            width: 90%;
            justify-content: center;
        }
    }

    span{
        font-weight: 600;
        font-size: 12px;
        color: var(--Grey-1);
    }
`