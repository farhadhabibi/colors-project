import React, { Component } from 'react';
import clsx from 'clsx';
// import Drawer from '@material-ui/core/Drawer'; find the snippet and test
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    createPalette: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    navBtns: {
        display: 'flex',
        flexDirection: 'row'
    }
})

class PaletteFormNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
            )
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { classes, open, saveNewPalette } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <ValidatorForm onSubmit={() => saveNewPalette(newPaletteName)}>
                            <TextValidator value={newPaletteName}
                                label='Palette Name'
                                name="newPaletteName"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter Palette Name', 'Palette Name is taken']}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Create Palette
                                </Button>
                        </ValidatorForm>
                        <Link to="/">
                            <Button variant="contained" color="secondary">Go Back</Button>
                        </Link>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default (withStyles)(styles)(PaletteFormNavbar);


