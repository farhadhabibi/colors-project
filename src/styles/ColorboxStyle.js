import chroma from 'chroma-js';
export default {
    ColorBox: {
        display: 'inline-block',
        width: '20%',
        height: props => props.showLink ? '25%' : '50%',
        marginBottom: '-3.5px',
        '&:hover button': {
            opacity: 1
        }
    },
    textColor: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgb(0, 0, 0, 0.5)' : 'white'
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgb(0, 0, 0, 0.5)' : 'white'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgb(0, 0, 0, 0.5)' : 'white',
        position: 'absolute',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        cursor: 'pointer',
        marginTop: '10.7%',
        marginLeft: '16.4%',
        width: '3%',
        padding: '4px',
        fontSize: '13px',
        textAlign: 'center',
        display: 'inline-block',
    },
    boxColor: {
        color: props => chroma(props.background).luminance() <= 0.06 ? 'white' : 'rgb(0, 0, 0, 0.5)',
        position: 'absolute',
        marginTop: props => props.showLink ? '10.3%' : '22.6%',
        padding: '10px',
        fontSize: '10px',
        letterSpacing: '0.07rem'
    },
    copyButton: {
        position: 'absolute',
        marginTop: props => props.showLink ? '5.5%' : '11%',
        marginLeft: '7%',
        outline: 'none',
        border: 'none',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        width: '6%',
        height: '3%',
        color: props => chroma(props.background).luminance() <= 0.06 ? 'white' : 'rgb(0, 0, 0, 0.5)',
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontSize: '13px',
        opacity: '0',
        textDecoration: 'none',
    },
    colorBoxContent: {
        textTransform: 'uppercase'
    },
    overLay: {
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        transition: '0.6s all ease-in-out',
        transform: 'scale(0.1)'
    },
    showOverlay: {
        opacity: '1',
        zIndex: '10',
        transform: 'scale(50)',
        position: 'absolute',
    },
    copyMessage: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        opacity: '0',
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        transition: '0.6s all ease-in-out',
        transform: 'scale(0.1)',
        '& h1': {
            backgroundColor: 'rgb(255, 255, 255, 0.3)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            fontWeight: 'normal',
            padding: '1rem',
            fontSize: '50px',
        },
        '& p': {
            fontWeight: '100',
            fontSize: '25px',
        }
    },
    showMessage: {
        opacity: 1,
        zIndex: 10,
        transform: 'scale(1)'
    },
}