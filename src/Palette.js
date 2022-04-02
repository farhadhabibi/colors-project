import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyle';
// import './Palette.css'

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level })
    }

    changeFormat(value) {
        this.setState({ format: value })
    }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state
        const colorBox = colors[level].map(color => (
            <ColorBox key={color.id} background={color[format]} name={color.name} paletteId={id} colorId={color.id} showLink />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat} slider />
                <div className={classes.PaletteColors}>
                    {colorBox}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default (withStyles)(styles)(Palette);
