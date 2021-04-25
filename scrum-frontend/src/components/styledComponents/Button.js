import styled from 'styled-components'
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
    min-width: 200px;
    border-radius: 40px;
    transition: 0.3s ease-in-out;
    margin: 10px;

    &:hover {
        border-radius: 2px;
        opacity: .9;
    }
`;

export default StyledButton