import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import MiniPalette from './MiniPalette';

class PaletteList extends React.Component {
    render() {
        const { palettes } = this.props;
        const colors = palettes.map(palette => (
            <p key={palette.id}><NavLink to={`/palette/${palette.id}`}>{palette.paletteName}</NavLink></p>
        ))
        return (
            <div>
                <MiniPalette />
                <h1>React Colors</h1>
                {colors}
            </div >
        )
    }
}

export default PaletteList;
