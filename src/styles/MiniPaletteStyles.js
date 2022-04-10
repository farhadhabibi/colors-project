export default {
    root: {
        position: 'relative',
        padding: '0.5rem',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: 1
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
    },
    delete: {

    },
    deleteIcon: {
        color: 'white',
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        top: 0,
        padding: '3px',
        borderRadius: '2px',
        opacity: 0,
        transition: 'all 0.4s ease-in-out'
    }

}
