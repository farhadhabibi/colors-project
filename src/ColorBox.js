import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false })
            }, 1500);
        })
    }

    render() {
        const { background, name } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ backgroundColor: background }} className="ColorBox">
                    <div className="ColorBox-content">
                        <button className="copy-button">Copy</button>
                        <span className="box-color">{name}</span>
                        <span className="see-more">More</span>
                    </div>
                    <div style={{ backgroundColor: background }} className={`copy-overlay ${copied && "show"}`} />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p>{this.props.background}</p>
                    </div>
                </div>
            </CopyToClipboard >
        )
    }
}

export default ColorBox;