import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

class SingleColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        }
        this.changeFormat = this.changeFormat.bind(this)
    }
    gatherColors() {
        const { palette, colorId } = this.props;
        let shades = [];
        const colors = palette.colors;

        for (let keys in colors) {
            shades.push(colors[keys].filter(color => color.id === colorId))
        }
        return shades.flat().slice(1);
    }

    changeFormat(value) {
        this.setState({ format: value })
    }

    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this.gatherColors().map(color => (
            <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false} />
            // <div style={{ backgroundColor: color.hex, width: '20%', height: '30px' }} key={color.name}></div>
        ));
        return (
            <div className="singleColorPalette palette">
                <Navbar changeFormat={this.changeFormat} slider={false} />
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default SingleColorBox;