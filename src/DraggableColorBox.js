import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

const styles = {
    root: {
        display: 'inline-block',
        width: '20%',
        height: '25%',
        marginBottom: '-4.9px',
        position: 'relative',
        cursor: 'pointer',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.3)'
        }
    },
    boxContent: {
        position: 'absolute',
        color: 'rgb(0, 0, 0, 0.5)',
        width: '100%',
        left: 0,
        bottom: 0,
        padding: '10px',
        fontSize: '12px',
        letterSpacing: '0.07rem',
        textTransform: 'upperCase',
        display: 'flex',
        justifyContent: 'space-between',
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out',
    }
}

const DraggableColorBox = SortableElement((props) => {
    const { classes, deleteColorBox, name, color } = props;

    function handleDeleteColorBox() {
        deleteColorBox(name)
    }

    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleDeleteColorBox} />
            </div>
        </div>
    );
})

export default (withStyles)(styles)(DraggableColorBox);
