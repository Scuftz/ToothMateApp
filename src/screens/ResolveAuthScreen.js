import React, {useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin(); //attempt automatic signin
    }, []);

    return null;
};

export default ResolveAuthScreen;
