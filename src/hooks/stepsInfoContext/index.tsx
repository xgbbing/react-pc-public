import React, { createContext, useReducer } from 'react';

function stepsReducer(state: any, action: { type: string; payload: any }) {
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

export const StepsContext: React.Context<any> = createContext(null);
export const StepsDispatchContext: React.Context<any> = createContext(null);

export function StepsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stepsReducer, {
    key: 'tab1',
  });

  return (
    <StepsContext.Provider value={state}>
      <StepsDispatchContext.Provider value={dispatch}>
        {children}
      </StepsDispatchContext.Provider>
    </StepsContext.Provider>
  );
}
