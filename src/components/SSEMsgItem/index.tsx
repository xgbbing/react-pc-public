import { logger } from '@/utils/logger';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';

interface SSEMsgItemProps {
  url: string;
  params: any;
  componentSource: string;
  onformdata: (data: any) => void;
  onCompleted: (data: any) => void;
  getContainerId?: string;
  eventInfo?: any;
  leftRender: (props: any) => React.ReactElement;
  rightRender: (props: any) => React.ReactElement;
}
const SSEMsgItem: FC<SSEMsgItemProps> = async (props) => {
  const { eventInfo, leftRender, rightRender } = props;
  // const [isActive, setIsActive] = useState(false);
  const sseAbortController = useRef<AbortController | null>(null);
  const [sseData, setSseData] = useState<any>(null);
  const [eventUsed, setEventUsed] = useState(false);

  const fetchStreamData = async () => {};

  const sseRequest = async (
    { url, params, componentSource }: any,
    onformdata: (data: any) => void,
    onCompleted: (data: any) => void,
  ) => {
    try {
      sseAbortController.current = new AbortController();
      logger(
        url,
        params,
        componentSource,
        onformdata,
        onCompleted,
        sseData,
        rightRender,
        'sse start',
      );
      // await fetchStreamData(url, params, onCompleted, () => { })
      await fetchStreamData();
    } catch (error) {
      logger('sse fail', error);
    }
    return null;
  };

  useEffect(() => {
    return () => {
      if (sseAbortController.current) {
        sseAbortController.current.abort();
        sseAbortController.current = null;
      }
    };
  });

  useEffect(() => {
    if (eventInfo) {
      if (!eventUsed) {
        setEventUsed(true);
        sseRequest(
          eventInfo?.value,
          (res: any) => {
            setSseData((prev: any) => {
              return (prev || [])?.concat(res);
            });
          },
          () => {
            logger('sse completed');
          },
        );
      }
    }
  }, [eventInfo, eventUsed]);

  if (eventInfo) {
    return (
      <>
        {leftRender && leftRender(props)}
        {/* {isActive && createPortal((
        <>
          {rightRender && rightRender(props)}
        </>
      ), document.getElementById(props?.getContainerId || 'dynamicContainer'))} */}
      </>
    );
  }
  return null;
};

export default memo(SSEMsgItem);
