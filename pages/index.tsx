
import { useAmp } from 'next/amp';

export const config = { amp: 'hybrid' };

const Index = () => {
    const isAmp = useAmp();
    return <p>Welcome to the {isAmp ? 'AMP' : 'normal'} version of the Index page!!</p>;
}

export default Index;
