import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
import chroma from 'chroma-js';
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
        const { background, name, paletteId, colorId, showLink } = this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.06;
        const isLightColor = chroma(background).luminance() >= 0.6;
        console.log(isLightColor)
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ backgroundColor: background }} className="ColorBox">
                    <div className="ColorBox-content">
                        <button className={`copy-button ${isLightColor && 'dark-color'}`}>Copy</button>
                        <span className={`box-color ${isDarkColor && 'white-color'}`}>{name}</span>
                        {showLink &&
                            <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                                <span className={`see-more ${isLightColor && 'dark-color'}`}>MORE</span>
                            </Link>
                        }
                    </div>
                    <div style={{ backgroundColor: background }} className={`copy-overlay ${copied && "show"}`} />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1 className={isLightColor && 'dark-color'}>copied!</h1>
                        <p className={isLightColor && 'dark-color'}>{this.props.background}</p>
                    </div>
                </div>
            </CopyToClipboard >
        )
    }
}

export default ColorBox;