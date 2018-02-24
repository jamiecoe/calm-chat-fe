import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  height: 20%;
  background: #0f263c;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #0f263c;
  box-sizing: border-box;
  color: white;
`;

const NewChatBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 5px;
  background: #10aad1;
  color: white;
  font-weight: 500;
  padding: 3px;
  border: 1px solid #10aad1;
  border-radius: 2px;
`;

const HeadingText = styled.div`
  text-align: center;
  font-family: 'Chivo', sans-serif;
`;

const Styledh1 = styled.h1`
  margin: 0;
  font-size: 20px;
`;

export class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <NewChatBtn onClick={this.props.refresh}>
          NEW CHAT    
        </NewChatBtn>
        <HeadingText>
          <Styledh1>THE CALM ZONE WEBCHAT</Styledh1>
        </HeadingText>
      </StyledHeader>
    );
  }
}
