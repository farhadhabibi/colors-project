import { DRAWER_WIDTH } from '../constands';
import mediaQueries from './MediaQueries';
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    createPalette: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    navBtns: {
        marginRight: '1rem',
        '& a': {
            textDecoration: 'none'
        },
        [mediaQueries.down('xs')]: {
            marginRight: '0.4rem',
        }
    },
    button: {
        margin: '0.5rem',
        [mediaQueries.down('xs')]: {
            margin: '0.2rem',
            padding: '0.3rem'
        }
    }
})

export default styles;