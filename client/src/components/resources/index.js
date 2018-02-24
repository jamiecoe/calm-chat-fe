import React from "react";
import styled from 'styled-components';


const Botresources = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Singleresource = styled.a`
background: white;
color: #333;
border-color: white;
border-style: solid;
border-width: 2px;
margin: 2% 5%;
border-radius: 2px;
font-size: 1rem;
font-weight: bold;
padding: 4px;
text-decoration: none;
&:hover {
  background: #ffe000;
  border-color: #ffe000;
}
`

export default class Resources extends React.Component {

  render() {
    if (!this.props.resources) {
      return null;
    }
    return (
      <Botresources>
        {this.props.resources.map((resource, index) => {
          return <Singleresource href={resource.href} key={index} target="__blank">
            {resource.text}</Singleresource>
        })}
      </Botresources>
    );
  }
}
