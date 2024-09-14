import React from 'react';
import { ReactFlow } from '@xyflow/react';
import './CircuitComponent.css';
import '@xyflow/react/dist/style.css';

const initialNodes = (data) => [
  { id: '1', position: { x: 0, y: 100 }, data: { label: 'Component' }, className: 'custom-node', style: {height: `${(data.length * 100) / 2}px`} },
  ...data.map((item, index) => ({
    id: `${index + 2}`,
    position: { x: 200, y: 100 + index * 50 },
    data: { label: item },
  }))
];

const initialEdges = (data) => [
  ...data.map((_, index) => ({
    id: `e1-${index + 2}`,
    source: '1',
    target: `${index + 2}`,
    animated: true,
  }))
];

export default function CircuitComponent({ data }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={initialNodes(data)} edges={initialEdges(data)} />
    </div>
  );
}
