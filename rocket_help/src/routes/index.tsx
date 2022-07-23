import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Loading } from '../components/Loading';
import { SingIn } from '../screens/SingIn';

import { AppRoutes } from './app.routes';
//para exibir rotas da aplicação
export function Routes() {
    const [loading, setInsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(response => {
                setUser(response);
                setInsLoading(false);
            })

        return subscriber;
    },[]);

    if(loading) {
        return <Loading />
    }

    return(
        <NavigationContainer>
            {user ? <AppRoutes /> : <SingIn />}
        </NavigationContainer>
    )
}