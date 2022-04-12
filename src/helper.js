import { useNavigate, useLocation } from 'react-router-dom'
export function withMyHook(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} nav={navigate} location={location} />;
    }
}