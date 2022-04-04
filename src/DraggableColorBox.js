import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'inline-block',
        width: '20%',
        height: '25%',
        marginBottom: '-3.5px',
    }
}

function DraggableColorBox(props) {
    return (
        <div className={props.classes.root} style={{ backgroundColor: props.color }}>
            {props.name}
        </div>
    );
}

export default (withStyles)(styles)(DraggableColorBox);
