import React, { createContext, useReducer } from 'react';

function commonReducer(state: any, action: { type: string; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    case 'changed':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export const CommonContext: React.Context<any> = createContext(null);
export const CommonDispatchContext: React.Context<any> = createContext(null);

export function CommonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(commonReducer, {
    key: 'tab1',
  });

  return (
    <CommonContext.Provider value={state}>
      <CommonDispatchContext.Provider value={dispatch}>
        {children}
      </CommonDispatchContext.Provider>
    </CommonContext.Provider>
  );
}
