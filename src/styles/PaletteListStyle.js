import mediaQueries from './MediaQueries'
import bg from './bgImage.svg'
export default {
    '@global': {
        // .item-enter {
        //     opacity: 0;
        //   }
        //   .item-enter-active {
        //     opacity: 1;
        //     transition: opacity 500ms ease-in;
        //   }
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out'
        }
    },
    root: {
        backgroundImage: `url(${bg})`,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'scroll'
    },
    container: {
        display: 'flex',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        [mediaQueries.down('lg')]: {
            width: '80%'
        },
        [mediaQueries.down('xs')]: {
            width: '80%'
        }
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        fontFamily: 'normal',
        alignItems: 'center',
        '& a': {
            color: 'white',
        },
        [mediaQueries.down('xs')]: {
            width: '90%',
            justifyContent: 'space-around',
        }
    },
    palettes: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%',
        width: '100%',
        [mediaQueries.down('sm')]: {
            gridTemplateColumns: 'repeat(2, 50%)',
        },
        [mediaQueries.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 80%)',
            gridGap: '1%',
            justifyContent: 'center'
        }
    }
}