import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc'

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    createPalette: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

class NewPaletteForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            colorValue: "#6e4b72",
            newName: "",
            colors: [{ color: 'blue', name: 'blue' }, { color: 'red', name: 'red' }],
            newPaletteName: ""
        }
        this.updateColorValue = this.updateColorValue.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveNewPalette = this.saveNewPalette.bind(this);
        this.deleteColorBox = this.deleteColorBox.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isNameUnique", value =>
            this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.state.colors.every(
                ({ color }) => color !== this.state.colorValue
            )
        );
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
            )
        );
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    };

    handleDrawerClose = () => {
        this.setState({ open: false })
    };

    updateColorValue(newColor) {
        this.setState({ colorValue: newColor.hex })
    }

    addNewColor() {
        const newColor = { color: this.state.colorValue, name: this.state.newName }
        this.setState({ colors: [...this.state.colors, newColor], newName: "" })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveNewPalette() {
        const newName = this.state.newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLocaleLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette);
        this.props.navigate('/');
    }

    deleteColorBox(name) {
        const newColors = this.state.colors.filter(color => (
            color.name !== name
        ))
        this.setState({ colors: newColors })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    render() {
        const { classes } = this.props;
        const { open, colorValue } = this.state;

        return (
            <div className={classes.root} >
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
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm className={classes.createPalette} onSubmit={this.saveNewPalette}>
                            <TextValidator value={this.state.newPaletteName}
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
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant="h4">Design Your Palette</Typography>
                    <div>
                        <Button variant="contained" color="secondary">
                            Clear Palette
                        </Button>
                        <Button variant="contained" color="primary">
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker color={colorValue} onChangeComplete={this.updateColorValue} />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            label="Color Name"
                            value={this.state.newName}
                            name="newName"
                            onChange={this.handleChange}
                            validators={['required', 'isNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a color name', 'The name should be unique', 'The color is used']}
                        />
                        <Button variant="contained" color="primary"
                            style={{ backgroundColor: colorValue }}
                            type="submit">
                            Add Color
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList colors={this.state.colors}
                        deleteColorBox={this.deleteColorBox} axis='xy' onSortEnd={this.onSortEnd} />
                </main>
            </div>
        )
    };
}

export default (withStyles)(styles)(NewPaletteForm);