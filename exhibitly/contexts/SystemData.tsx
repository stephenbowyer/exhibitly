import { createContext } from 'react';

const SystemDataContext = createContext({collectionOffset: {x: 0, y: 0}, collectionLoads: 0});

export default SystemDataContext;
