import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        // display: 'inline-block',
        // width: '25%',
        // height: '20%',
        // margin: '10px',
        // padding: '0.5rem',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        // overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    color: {
        display: 'inline-block',
        // width: '20%',
        // height: '30px',
        // padding: '10px'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    emoji: {
        fontSize: '1.5rem'
    }

}

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors } = props;

    return (
        <div className={classes.root}>
            {
                colors.map(color => (
                    <div className={classes.color} style={{ backgroundColor: color.color }}></div>
                ))
            }
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default (withStyles)(styles)(MiniPalette);