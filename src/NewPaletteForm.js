import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc'
import PaletteFormNavbar from './PaletteFormNavbar';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';
import styles from './styles/NewPaletteFromStyles'

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColor: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            colors: seedColors[0].colors,
        }
        this.addNewColor = this.addNewColor.bind(this);
        this.saveNewPalette = this.saveNewPalette.bind(this);
        this.deleteColorBox = this.deleteColorBox.bind(this)
        this.clearPalette = this.clearPalette.bind(this)
        this.createRandomColor = this.createRandomColor.bind(this)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    };

    handleDrawerClose = () => {
        this.setState({ open: false })
    };

    addNewColor(newColor) {
        this.setState({ colors: [...this.state.colors, newColor] })
    }

    saveNewPalette(newPalette) {
        const newCreatedPalette = {
            paletteName: newPalette.paletteName,
            id: newPalette.paletteName.toLocaleLowerCase().replace(/ /g, '-'),
            emoji: newPalette.emoji,
            colors: this.state.colors
        }
        this.props.savePalette(newCreatedPalette);
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
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColor;

        return (
            <div className={classes.root} >
                <PaletteFormNavbar open={open}
                    saveNewPalette={this.saveNewPalette}
                    handleDrawerOpen={this.handleDrawerOpen}
                    palettes={this.props.palettes} />
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
                    <div className={classes.container}>
                        <Typography variant="h5" gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button variant="contained" color="secondary"
                                onClick={this.clearPalette}>
                                Clear Palette
                        </Button>
                            <Button variant="contained" color="primary"
                                onClick={this.createRandomColor}
                                disabled={paletteIsFull}>
                                Random Color
                        </Button>
                        </div>
                        <ColorPickerForm colors={colors}
                            paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} />
                    </div>
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