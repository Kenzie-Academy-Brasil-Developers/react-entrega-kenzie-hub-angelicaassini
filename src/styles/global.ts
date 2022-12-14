import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --color-primary: #FF577F;;
        --color-primary-Focus: #FF427F;
        --color-primary-disable: #59323F;
        
        --Grey-4: #121214;
        --Grey-3: #212529;
        --Grey-2: #343B41;
        --Grey-1: #868E96;
        --Grey-0: #F8F9FA;
                
        --color-success: #3FE864;
        --color-error: #E83F5B;

        --button-primary: #FF577F;
        --button-primary-hover: #FF427F;
        --button-primary-negative: #59323F;
        --button-primary-disabled: #868e96;
        --button-primary-disabled-hover: #343b41;     
        
        --color-background: #000000;
    }

    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    body, html{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    body{
        background: var(--color-background);
        overflow-x: hidden;
    }

    button{
        cursor: pointer;
    }

    ul{
        list-style: none;
    }
`;