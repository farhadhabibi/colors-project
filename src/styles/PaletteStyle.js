export default {
    Palette: {
        height: '100vh'
    },
    PaletteColors: {
        height: '90vh'
    },
    goBack: {
        display: 'inline-block',
        width: '20%',
        height: props => props.showLink ? '25%' : '50%',
        marginBottom: '-3.5px',
        opacity: 1,
        backgroundColor: 'black',
        '& a': {
            position: 'absolute',
            color: 'white',
            marginTop: '11%',
            marginLeft: '7%',
            outline: 'none',
            border: 'none',
            backgroundColor: 'rgb(255, 255, 255, 0.3)',
            width: '6%',
            height: '3%',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: '13px',
            opacity: '1',
            textDecoration: 'none',
            textAlign: 'center'
        }
    }
}