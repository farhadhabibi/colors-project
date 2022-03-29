import React, { Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import { withMyHook } from './colorHelper'

const styles = {
    root: {
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    container: {
        display: 'flex',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        fontFamily: 'normal'
    },
    palettes: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%',
        width: '100%'
    }
}

class PaletteList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { palettes, classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {
                            palettes.map(palette => (
                                <MiniPalette {...palette} key={palette.id} />
                            ))
                        }
                    </div>
                </div>
            </div >
        )
    }
}

export default (withStyles)(styles)(PaletteList);
