import React from 'react';
import { ReactFlow } from '@xyflow/react';
import './css/CircuitComponent.css';
import '@xyflow/react/dist/style.css';

// Function to create initial nodes for each component block
const initialNodes = (data, blockIndex, offsetX, componentNames) => [
  { id: `comp-${blockIndex}-1`, position: { x: offsetX, y: 100 }, data: { label: componentNames[blockIndex] }, className: 'custom-node', style: { height: `${(data.length * 100) / 2}px` } },
  ...data.map((item, index) => ({
    id: `comp-${blockIndex}-${item}`, // Unique ID for each item in the block
    position: { x: offsetX + 195, y: 100 + index * 50 },
    data: { label: item },
    className: 'custom-pinout-node',
  }))
];

// Function to create edges for each component block
const initialEdges = (data, blockIndex) => [
  ...data.map((item) => ({
    id: `e-comp-${blockIndex}-${item}`,
    source: `comp-${blockIndex}-1`,
    target: `comp-${blockIndex}-${item}`,
    animated: true,
  }))
];

// Function to connect matching nodes between different component blocks
const connectMatchingNodes = (dataBlocks) => {
  const commonEdges = [];
  
  for (let i = 0; i < dataBlocks.length - 1; i++) {
    for (let j = i + 1; j < dataBlocks.length; j++) {
      const commonItems = dataBlocks[i].filter(item => dataBlocks[j].includes(item));
      commonItems.forEach(item => {
        commonEdges.push({
          id: `match-${item}-${i}-${j}`,
          source: `comp-${i}-${item}`,
          target: `comp-${j}-${item}`,
        });
      });
    }
  }
  
  return commonEdges;
};

export default function CircuitBoard({ data,  componentNames }) {
  const dataBlocks = data; // Expecting data in the form of data = {[], []}

  const nodes = [];
  const edges = [];

  // Loop over each data block and generate nodes and edges
  dataBlocks.forEach((blockData, index) => {
    const offsetX = index * 350; // Separate each component block visually by 400px
    nodes.push(...initialNodes(blockData, index, offsetX, componentNames));
    edges.push(...initialEdges(blockData, index));
  });

  // Add edges connecting matching nodes between different component blocks
  const matchingEdges = connectMatchingNodes(dataBlocks);

  const proOptions = { hideAttribution: true };

  return (
    <div style={{ width: '100%', height: '50vh', border: '1px solid #ccc' }}>
      <ReactFlow
        nodes={nodes}
        edges={[...edges, ...matchingEdges]} 
        proOptions={proOptions}
        fitView
      />
    </div>
  );
}

{/* <CircuitComponent data={[['5V', 'GND', 'D5', 'D6', 'D7'], ['5V', 'GND', 'D1', 'D2'], ['D1', 'D2']]} /> */}