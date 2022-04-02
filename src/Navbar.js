import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/NavbarStyles';
import 'rc-slider/assets/index.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true })
        this.props.changeFormat(e.target.value);
    }

    handleClose() {
        this.setState({ open: false })
    }

    render() {
        const { level, changeLevel, slider, classes } = this.props;
        const { format } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <NavLink to="/">reactcolorpicker</NavLink>
                </div>
                {slider &&
                    <div>
                        <span>Level {level}</span>
                        <div className={classes.slider}>
                            <Slider defaultValue={level} min={100} max={900} step={100}
                                onAfterChange={changeLevel} />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                    onClose={this.handleClose}
                    action={
                        <IconButton onClick={this.handleClose} color='inherit' key='close' aria-label='close'>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />

            </header>
        )
    }
}

export default (withStyles)(styles)(Navbar);