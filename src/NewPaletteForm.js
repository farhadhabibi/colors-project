import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc'
import PaletteFormNavbar from './PaletteFormNavbar';

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
    static defaultProps = {
        maxColor: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            colorValue: "#6e4b72",
            newName: "",
            colors: this.props.palettes[0].colors,
        }
        this.updateColorValue = this.updateColorValue.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveNewPalette = this.saveNewPalette.bind(this);
        this.deleteColorBox = this.deleteColorBox.bind(this)
        this.clearPalette = this.clearPalette.bind(this)
        this.createRandomColor = this.createRandomColor.bind(this)
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

    saveNewPalette(newPaletteName) {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
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

    clearPalette() {
        this.setState({ colors: [] })
    }

    createRandomColor() {
        const allColors = this.props.palettes.map(palette => (
            palette.colors
        )).flat();
        const randomNumber = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[randomNumber]
        this.setState({ colors: [...this.state.colors, randomColor] })
    }

    render() {
        const { classes, maxColor } = this.props;
        const { open, colorValue, colors } = this.state;
        const paletteIsFull = colors.length >= maxColor;

        return (
            <div className={classes.root} >
                <PaletteFormNavbar classes={classes} open={open}
                    saveNewPalette={this.saveNewPalette} handleDrawerOpen={this.handleDrawerOpen} />
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
                        <Button variant="contained" color="secondary" onClick={this.clearPalette}>
                            Clear Palette
                        </Button>
                        <Button variant="contained" color="primary"
                            onClick={this.createRandomColor}
                            disabled={paletteIsFull}>
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
                            style={{ backgroundColor: paletteIsFull ? 'grey' : colorValue }}
                            type="submit" disabled={paletteIsFull}>
                            {paletteIsFull ? 'Palette Full' : 'Add Color'}
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