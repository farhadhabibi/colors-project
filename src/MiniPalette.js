import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, id } = props;
    const navigate = useNavigate();

    function GoToPalette() {
        navigate(`/palette/${id}`);
    }

    return (
        <div className={classes.root} onClick={GoToPalette}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.deleteIcon} />
            </div>
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