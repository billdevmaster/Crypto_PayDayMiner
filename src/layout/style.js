import Styled from 'styled-components';

const HeaderStyle = Styled.div`
    background-color: #9c0404;
    color: #F8F7F7;
    font-family: 'Roboto',sans-serif;
    padding: 10px 0;
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // @media(max-width: 768px) {
        //     display: block;
        // }
        .navbar {
            @media(min-width: 768px) {
                width: 80%;
                display: inline-block;
            }
        }
        .navbar-brand {
            float: left;

        }
        .collapse {
            float: right;
            .nav-link {
                color: #F8F7F7;
                font-size: 18px;
                padding-right: 1.5rem;
                
                &:hover {
                    color: #F8F7F7;
                }
            }
        }
        .btn-connect {
            background-color: transparent;
            background-image: linear-gradient(180deg, #FFE115 0%, #FF9C00 100%);
            border-radius: 6px;
            padding: 13px 16px;
            border: none;
            line-height: 1;
            svg {
                color: #333;
                font-size: 13px;
                margin-right: 10px;
            }
            span {
                font-family: "Poppins", Sans-serif;
                font-size: 13px;
                fill: #000000;
                color: #000000;
                letter-spacing: 0.3px;
            }
        }
    }
`;

const FooterStyle = Styled.div`
    .border-t {
        border-top: 1px solid #000;
    }
    footer {
        background-color: #6f0404;
        .footer-logo {
            width: auto;
        }
        ul.social-link {
            display: inline-block;
            list-style: none;
            float: right;
            padding: 0;
            @media (max-width: 768px) {
                float: left;
                margin-top: 10px;
            }
            li {
                float: left;
                a {
                    color: white;
                    font-size: 24px;
                    margin-right: 40px;
                    @media (max-width: 768px) {
                        margin-right: 25px;
                    }
                }
            }
        }
        .risk {
            font-size: 13px;
            color: #79866e;
        }
        .container {
            padding: 20px 10px;
        }

        .meta {
            background-color: #4B0202;
            .container {
                padding: 10px 10px;
            }
            p {
                display: inline-block;
                color: #BCBCBC;
                font-size: 12px;    
                margin: 0;
                &:last-child {
                    float: right;
                }
            }
        }
    }
`;

export {
    HeaderStyle,
    FooterStyle
};