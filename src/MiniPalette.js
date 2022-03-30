import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate, useParams, Navigate } from 'react-router-dom';

const styles = {
    root: {
        padding: '0.5rem',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    color: {
        backgroundColor: 'grey',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    miniColors: {
        display: 'inline-block',
        width: '20%',
        height: '1.8rem',
        marginBottom: '-3.5px',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto'
    },
    emoji: {
        fontSize: '1.5rem'
    }

}

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, id } = props;
    const navigate = useNavigate();

    function GoToPalette() {
        navigate(`/palette/${id}`);
    }

    return (
        <div className={classes.root} onClick={GoToPalette}>
            <div className={classes.color}>
                {
                    colors.map(color => (
                        <div className={classes.miniColors} style={{ backgroundColor: color.color }} key={color.name}></div>
                    ))
                }
            </div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div >
    )
}

export default (withStyles)(styles)(MiniPalette);