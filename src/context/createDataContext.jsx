import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const contextValue = React.useMemo(() => {
      const boundActions = actions.map(action => action(dispatch));

      return { state, ...boundActions };
    }, [state]);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
