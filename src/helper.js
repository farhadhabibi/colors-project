import { useNavigate } from 'react-router-dom'
export function withMyHook(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} nav={navigate} />;
    }
}