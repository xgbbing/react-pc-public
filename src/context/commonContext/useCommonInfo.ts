import useUrlState from '@ahooksjs/use-url-state';
import { useCallback, useContext } from 'react';
import { CommonContext, CommonDispatchContext } from './index';

export default function useCommonInfo() {
  const setUrlState = useUrlState()[1];
  const state = useContext(CommonContext);
  const dispatch = useContext(CommonDispatchContext);

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
