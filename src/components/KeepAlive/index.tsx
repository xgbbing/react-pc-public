import React, { useRef } from 'react';

interface KeepAliveProps {
  activeKey: string;
  children: React.ReactNode;
}
const KeepAlive: React.FC<KeepAliveProps> = ({ activeKey, children }) => {
  const visitedKeys = useRef(new Set());
  visitedKeys.current.add(activeKey);

  return (
    <>
      {React.Children.map(children, (child: any) => {
        const key = child.key;
        const isActive = key === activeKey;
        const hasVisited = visitedKeys.current.has(key);

        if (!hasVisited) return null;

        return (
          <div style={{ display: isActive ? 'block' : 'none', height: '100%' }}>
            {child}
          </div>
        );
      })}
    </>
  );
};

export default KeepAlive;
