import React, { Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyle';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
                    <TransitionGroup className={classes.palettes}>
                        {
                            palettes.map(palette => (
                                <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                    <MiniPalette {...palette} key={palette.id}
                                        handleDeletePalette={deletePalette} />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </div>
            </div >
        )
    }
}

export default (withStyles)(styles)(PaletteList);
