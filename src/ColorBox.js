import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorboxStyle';
// import './ColorBox.css';


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
        const { background, name, paletteId, colorId, showLink, classes } = this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.06;
        const isLightColor = chroma(background).luminance() >= 0.6;
        console.log(isLightColor)
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ backgroundColor: background }} className={classes.ColorBox}>
                    <div className={classes.colorBoxContent}>
                        <button className={classes.copyButton}>Copy</button>
                        <span className={classes.boxColor}>{name}</span>
                        {showLink &&
                            <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                                <span className={classes.seeMore}>MORE</span>
                            </Link>
                        }
                    </div>
                    <div style={{ backgroundColor: background }} className={`${classes.overLay} ${copied && classes.showOverlay}`} />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1 className={classes.copyText}>copied!</h1>
                        <p className={classes.textColor}>{this.props.background}</p>
                    </div>
                </div>
            </CopyToClipboard >
        )
    }
}

export default (withStyles)(styles)(ColorBox);