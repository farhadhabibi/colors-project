import mediaQueries from './MediaQueries'
export default {
    Palette: {
        height: '100vh'
    },
    PaletteColors: {
        height: '90vh'
    },
    goBack: {
        position: 'relative',
        display: 'inline-block',
        width: '20%',
        height: '50%',
        marginBottom: '-3.5px',
        opacity: 1,
        backgroundColor: 'black',
        '& a': {
            position: 'absolute',
            color: 'white',
            outline: 'none',
            border: 'none',
            backgroundColor: 'rgb(255, 255, 255, 0.3)',
            width: '100px',
            height: '25px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: '13px',
            opacity: '1',
            textDecoration: 'none',
            textAlign: 'center',
            top: '45%',
            left: '40%',
            width: '100px'
        },
        [mediaQueries.down('lg')]: {
            width: '25%',
            height: props => props.showLink ? '20%' : '33.3333%',
        },
        [mediaQueries.down('md')]: {
            width: '50%',
            height: props => props.showLink ? '10%' : '20%',
        },
        [mediaQueries.down('xs')]: {
            width: '100%',
            height: props => props.showLink ? '5%' : '10%',
        }
    }
}