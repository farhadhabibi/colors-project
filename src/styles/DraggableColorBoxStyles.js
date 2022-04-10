import mediaQueries from './MediaQueries'
export default {
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
        },
        [mediaQueries.down('sm')]: {
            width: '50%',
            height: '10%',
        },
        [mediaQueries.down('xs')]: {
            width: '100%',
            height: '5%'
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