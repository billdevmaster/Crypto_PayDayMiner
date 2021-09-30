import Styled from 'styled-components';

const HireStyle = Styled.div`
    > div {
        min-height: 80vh;
        background-size: cover;
        padding: 50px 0;
        @media(max-width: 768px) {
            padding: 20px 0;
            .buy {
                .btn {
                    margin-top: 20px;
                }
            }
        }
    }
`;

export {
    HireStyle
};