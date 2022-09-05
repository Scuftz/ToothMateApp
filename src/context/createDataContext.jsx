import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const contextValue = React.useMemo(() => {
      const boundActions = {};
      for (const key in actions) {
        boundActions[key] = actions[key](dispatch);
      }

      return { state, ...boundActions };
    }, [state]);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
