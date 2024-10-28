import { createContext } from 'react';

const UserDataContext = createContext({
    userName: '',
    secret: '',
    customCollections: []
});

export default UserDataContext;
