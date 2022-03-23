import React, { Component } from 'react';
import './ColorBox.css';

class ColorBox extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: this.props.background }} className="ColorBox">
                <span>{this.props.name}</span>
            </div>
        )
    }
}

export default ColorBox;