import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css'

class Palette extends Component {
    render() {
        const colorBox = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ))
        return (
            <div className="Palette">
                {/* navbar component */}
                <div className="Palette-colors">
                    {colorBox}
                </div>
                {/* footer */}
            </div>
        )
    }
}

export default Palette;
