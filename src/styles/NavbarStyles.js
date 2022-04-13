import mediaQueries from './MediaQueries'
export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    logo: {
        backgroundColor: 'rgb(228, 225, 225)',
        padding: '10px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'normal',
        fontSize: '19px',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        },
        [mediaQueries.down('xs')]: {
            display: 'none'
        }
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    slider: {
        width: '20%',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track': {
            backgroundColor: 'transparent',
        },
        '& .rc-slider-rail': {
            height: '8px',
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover': {
            backgroundColor: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
            marginTop: '-3.5px',
        },
        [mediaQueries.down('lg')]: {
            width: '50%'
        },
        [mediaQueries.down('xs')]: {
            width: '50%'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem',
    }
}