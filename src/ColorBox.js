import React, { Component } from 'react';
import './ColorBox.css';

class ColorBox extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: this.props.background }} className="ColorBox">
                <div className="ColorBox-content">
                    <button className="copy-button">Copy</button>
                    <span className="box-color">{this.props.name}</span>
                    <span className="see-more">More</span>
                </div>
            </div>
        )
    }
}

export default ColorBox;