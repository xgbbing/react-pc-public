import useUrlState from '@ahooksjs/use-url-state';
import { useCallback, useContext } from 'react';
import { StepsContext, StepsDispatchContext } from './index';

export default function useStepsInfo() {
  const setUrlState = useUrlState()[1];
  const state = useContext(StepsContext);
  const dispatch = useContext(StepsDispatchContext);

  const updatedStepsKey = useCallback(
    (newInfo: any) => {
      dispatch({
        type: 'changed',
        payload: newInfo,
      });
      setUrlState({
        stepKey: newInfo?.key,
      });
    },
    [dispatch],
  );

  return {
    state,
    updatedStepsKey,
  };
}
