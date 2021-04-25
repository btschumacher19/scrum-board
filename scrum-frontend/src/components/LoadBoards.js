import { Link } from "react-router-dom";
import styled from "styled-components";
import StyledLink from './styledComponents/Link';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Icon } from "@material-ui/core";

const StyledBoardName = styled.h1`
    color: #fff;
    transform: 0.3s ease-in-out;
    text-decoration: underline;

    &:hover {
        color: #87556f;
        /* text-de */
        transform: scale(1.1);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Outer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const BoardCard = styled.div`
    background-color: rgba(255, 255, 255, 0.08);
    /* border: solid 2px #322f3d; */
    border-radius: 20px;
    width: 250px;
    height: 200px;
    box-shadow: 0px 4px 22px 1px rgba(0,0,0,0.40);
    transition: 0.4s ease-in-out;
    display: grid;
    grid-template-columns: 85% 1fr;
    place-content: center;
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 23px 22px 9px rgba(0,0,0,0.33);
    }
`;

const Header = styled.div`
    border-bottom: solid 1px #322f3d;
    width: 95%;
    margin-bottom: 2rem;
`;

const LoadBoards =( props )=> {
                   
    const today =()=> {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today
    }
    const mapper =( arr, column )=> {
        return arr.map((board, idx) => {
            return (
                column === "active" ? 
                    board.end_date < today() ?
                    <StyledLink to={`/board/${board.id}`} style={{textDecoration: 'none'}}>
                        <BoardCard >
                            <span>
                            <StyledBoardName> { board.board_title } </StyledBoardName>
                            Finishes: { board.end_date}
                            </span>
                            <span style={{verticalAlign: 'center', margin: 'auto', marginRight: '20px'}}>
                        <Icon ><ArrowForwardIosIcon /></Icon>
                        </span>
                        </BoardCard>
                        </StyledLink>
                : undefined
                :  
                    board.end_date > today() ?
                    <BoardCard>
                        <span>
                        <StyledLink to={`/board/${board.id}`}><StyledBoardName> { board.board_title } </StyledBoardName></StyledLink>
                        Finished: { board.end_date}
                        </span>
                        <span style={{verticalAlign: 'center', margin: 'auto', marginRight: '20px'}}>
                        <Icon><ArrowForwardIosIcon/></Icon>
                        </span>
                    </BoardCard>
                : undefined
            )
        })
    }

        return (
            <Outer >
            <Wrapper>
                <Header >
                <h2>Active Boards</h2>
                </Header>
                {props.b ? mapper(props.b, "active") : <p> Create your first board! </p> }
            </Wrapper>
            < Wrapper>
            <Header >
                <h2>Finished Boards</h2>
                </Header>
                {props.b ? mapper(props.b, "archive") : <p> Create your first board! </p> }
            </Wrapper>
            </Outer>
        )
    
}

export default LoadBoards