import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import './ColorBox.css';

const styles = {
    ColorBox: {
        display: 'inline-block',
        width: '20%',
        height: props => props.showLink ? '25%' : '50%',
        marginBottom: '-3.5px',
        '&:hover button': {
            opacity: 1
        }
    },
    textColor: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgb(0, 0, 0, 0.5)' : 'white'
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgb(0, 0, 0, 0.5)' : 'white'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgb(0, 0, 0, 0.5)' : 'white',
        position: 'absolute',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        cursor: 'pointer',
        marginTop: '10.7%',
        marginLeft: '16.4%',
        width: '3%',
        padding: '4px',
        fontSize: '13px',
        textAlign: 'center',
        display: 'inline-block',
    },
    boxColor: {
        color: props => chroma(props.background).luminance() <= 0.06 ? 'white' : 'rgb(0, 0, 0, 0.5)',
        position: 'absolute',
        marginTop: props => props.showLink ? '10.3%' : '22.6%',
        padding: '10px',
        fontSize: '10px',
        letterSpacing: '0.07rem'
    },
    copyButton: {
        position: 'absolute',
        marginTop: props => props.showLink ? '5.5%' : '11%',
        marginLeft: '7%',
        outline: 'none',
        border: 'none',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        width: '6%',
        height: '3%',
        color: props => chroma(props.background).luminance() <= 0.06 ? 'white' : 'rgb(0, 0, 0, 0.5)',
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontSize: '13px',
        opacity: '0',
        textDecoration: 'none',
    },
    colorBoxContent: {
        textTransform: 'uppercase'
    },
    overLay: {
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        transition: '0.6s all ease-in-out',
        transform: 'scale(0.1)'
    },
    showOverlay: {
        opacity: '1',
        zIndex: '10',
        transform: 'scale(50)',
        position: 'absolute',
    },
    copyMessage: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        opacity: '0',
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        transition: '0.6s all ease-in-out',
        transform: 'scale(0.1)',
        '& h1': {
            backgroundColor: 'rgb(255, 255, 255, 0.3)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            fontWeight: 'normal',
            padding: '1rem',
            fontSize: '50px',
        },
        '& p': {
            fontWeight: '100',
            fontSize: '25px',
        }
    },
    showMessage: {
        opacity: 1,
        zIndex: 10,
        transform: 'scale(1)'
    },
}


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