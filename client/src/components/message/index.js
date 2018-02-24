import React from "react";
import Buttons from "../buttons";
import Resources from "../resources";
import styled, { css } from "styled-components";
import botAvatar from '../../assets/ic_chat_black_36px.svg';

const Botmessage = styled.p`

    float: left;
    margin-left: 4%;
    margin-right: 20%;
    background-color: #d1dce6;
    color: #333;
    border-radius: 2px;
    padding: 10px;
    min-width: 2.2rem;

  ${props => props.dotty && css`
      &:after {
        overflow: hidden;
        display: block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4, end) 1000ms infinite;
        animation: ellipsis steps(4, end) 1000ms infinite;
        content: "...";
        width: 0px;
      }



      @keyframes ellipsis {
        to {
          width: 3em;
        }
      }

      @-webkit-keyframes ellipsis {
        to {
          width: 3em;
        }
      }
    `}


`;

const Usermessage = styled.p`
  float: right;
  background-color: #dadada;
  border-radius: 2px;
  padding: 10px;
  margin-right: 4%;
  max-width: 60%;
`;

const StyledImg = styled.img`
width: 12%;
height: 12%;
margin-top: 11px;
margin-left: 2%;
max-width: 44px;
`

const StyledBotContainer = styled.div`
  display: flex;
  width: 100%;
`

export class Message extends React.Component {

  render() {
    const speaker = this.props.messageObj.isUser ? (
      <Usermessage>{this.props.messageObj.speech}</Usermessage>
    ) : (<StyledBotContainer><StyledImg src={botAvatar} />
      <Botmessage dotty={this.props.messageObj.speech === "" ? "dotty" : ""}>
        {this.props.messageObj.speech}
      </Botmessage>
    </StyledBotContainer>);
    return (
      <div>
        {speaker}
        <Buttons
          options={this.props.messageObj.options}
          addMessage={this.props.addMessage}
          sendMessage={this.props.sendMessage}
          uniqueId={this.props.uniqueId}
        />
        <Resources resources={this.props.messageObj.resources} />
      </div>
    );
  }
}
