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
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 350;

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
        justifyContent: 'space-between',
        alignItems: 'center'
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
        marginRight: '1rem',
        '& a': {
            textDecoration: 'none'
        }
    },
    button: {
        margin: '0.5rem'
    }
})

class PaletteFormNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formShowing: false
        }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    showForm() {
        this.setState({ formShowing: true })
    }

    hideForm() {
        this.setState({ formShowing: false })
    }

    render() {
        const { classes, open, saveNewPalette, palettes } = this.props;

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
                        <Link to="/">
                            <Button variant="contained" color="secondary">Go Back</Button>
                        </Link>
                        <Button variant="contained" color="primary"
                            className={classes.button} onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.formShowing
                    && <PaletteMetaForm palettes={palettes}
                        saveNewPalette={saveNewPalette}
                        hideForm={this.hideForm} />
                }
            </div>
        )
    }
}

export default (withStyles)(styles)(PaletteFormNavbar);


