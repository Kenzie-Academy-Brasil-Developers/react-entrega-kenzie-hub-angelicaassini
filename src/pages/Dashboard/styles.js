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

    main{
        width: 100%;
        height: 530px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: 40px;
        gap: 25px;
        background-color: var(--Grey-4);

        h1{
            font-weight: 700;
            font-size: 18px;
            color: var(--Grey-1);
        }

        h3{
            font-weight: 400;
            font-size: 16px;
            color: #FFFFFF;
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