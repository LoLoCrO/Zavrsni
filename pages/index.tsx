
import Router from 'next/router';

const Index = () => {

    if (process.browser && Router) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        Router.push('/login')
    }

    return (<></>);
}

export default Index;
