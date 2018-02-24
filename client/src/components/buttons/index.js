import React from "react";
import styled from "styled-components";

const Botbuttons = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
`;
const Styledbutton = styled.button`
  background: ${props => props.primary ? '#ffe000' : 'white'};
  color: #333;
  border-color: ${props => props.primary ? '#ffe000' : 'white'};
  border-style: solid;
  border-width: 2px;
  margin: 5%;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: bold;
  padding: 4px 10px;
  text-transform: uppercase;
`;


export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  clickHandler(speech, postback) {
    const data = {
      isUser: true,
      isWaiting: true,
      speech,
      uniqueId: this.props.uniqueId
    };
    const buttonDots = {
      speech: ""
    };
    this.props.addMessage(data);
    this.props.addMessage(buttonDots);
    this.props.sendMessage({ speech: postback, uniqueId: this.props.uniqueId });
    this.setState({ disabled: true });
  }

  render() {
    if (!this.props.options || this.state.disabled) return null;

    return (
      <Botbuttons>
        {this.props.options.map((option, index) => (
          <Styledbutton
            value={option.postback}
            key={index}
            onClick={() => this.clickHandler(option.text, option.postback)}
            
          >
            {option.text}
          </Styledbutton>
        ))}
      </Botbuttons>
    );
  }
}
