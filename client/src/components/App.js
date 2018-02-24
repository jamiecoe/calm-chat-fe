import React from "react";
import { Header } from "./header";
import { Conversation } from "./conversation";
import { Input } from "./input";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;  
  box-sizing: border-box;
  border: 1px  solid #0f263c;
  font-family: "Open Sans", sans-serif;
`;

const timeDelay = (Math.random() * 2000) + 1000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputStatus: false
    };
  }

  addMessage = message => {
    if (!message.isUser && !message.isDot) {
      setTimeout(() => {
        this.removeWaitingDots();
        this.setState((prevState, props) => {
          return {
            messages: [...prevState.messages, message]
          };
        });
      }, timeDelay);
    } else {
      this.setState((prevState, props) => {
        return {
          messages: [...prevState.messages, message]
        };
      });
    }
  };

  removeWaitingDots() {
    if(this.state.messages.length > 0) {
      if (this.state.messages[this.state.messages.length - 1].speech === "") {

        this.setState(prevState => {
          return {messages: [...prevState.messages.slice(0, -1)]}
        });
      }
    }
  }

  componentDidMount() {
    this.addMessage({
      speech: "Welcome to the Calm Zone Chat.",
      isUser: false,
      isDot: false
    });
    this.addMessage({
      speech: "This is an automed chat service. How can we help?",
      isUser: false,
      isDot: false
    })
  }

  sendMessage(data) {
    this.sendToServer(data)
      .then(res => res.json())
      .then(resData => {
        if (resData.retrigger) {

          setTimeout(() => {
            this.sendMessage({
              speech: resData.retrigger,
              uniqueId: this.props.uniqueId
            })
          }, timeDelay)

        }

        if (resData.options.length === 0) {
          this.setState({ inputStatus: false });
        } else {
          this.setState({ inputStatus: true });
        }
        resData.isUser = false;
        resData.isWaiting = false;

        // Add dots
        this.addMessage({
          speech: "",
          isUser: false,
          isDot: true
        })
        this.addMessage(resData);
      });
  }

  sendToServer(data) {
    return fetch("http://ec2-35-178-100-91.eu-west-2.compute.amazonaws.com:3001/usermessage", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify(data)
    });
  }

  refresh = () => {
    this.setState({
      messages: []
    });

    this.addMessage({
      speech: "Welcome to the Calm Zone Chat.",
      isUser: false,
      isDot: false
    });
    this.addMessage({
      speech: "This is an automed chat service. How can we help?",
      isUser: false,
      isDot: false
    })
  };

  render() {
    return (
      <Container>
        <Header refresh={this.refresh.bind(this)} />
        <Conversation
          messages={this.state.messages}
          addMessage={this.addMessage.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
          uniqueId={this.props.uniqueId}
        />

        <Input
          addMessage={this.addMessage.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
          inputStatus={this.state.inputStatus}
          uniqueId={this.props.uniqueId}
        />
      </Container>
    );
  }
}
