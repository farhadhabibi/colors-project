import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

const MiniPalette = React.memo(function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, id } = props;
    const navigate = useNavigate();

    function GoToPalette() {
        navigate(`/palette/${id}`);
    }

    function deletePalette(e) {
        e.stopPropagation();
        props.handleDeletePalette(id)
    }

    return (
        <div className={classes.root} onClick={GoToPalette}>
            <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
            <div className={classes.color}>
                {
                    colors.map(color => (
                        <div className={classes.miniColors}
                            style={{ backgroundColor: color.color }} key={color.name}></div>
                    ))
                }
            </div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div >
    )
})

export default (withStyles)(styles)(MiniPalette);