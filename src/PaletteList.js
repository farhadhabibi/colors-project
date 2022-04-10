import React, { Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyle';

class PaletteList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { palettes, classes, deletePalette } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <NavLink to="/palette/new">Create Palette</NavLink>
                    </nav>
                    <div className={classes.palettes}>
                        {
                            palettes.map(palette => (
                                <MiniPalette {...palette} key={palette.id}
                                    handleDeletePalette={deletePalette} />
                            ))
                        }
                    </div>
                </div>
            </div >
        )
    }
}

export default (withStyles)(styles)(PaletteList);
