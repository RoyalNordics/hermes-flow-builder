import React from 'react';

import { useState } from 'react';
import yaml from 'js-yaml';

const FlowEditor = () => {
  const [nodes, setNodes] = useState([
    { id: '1', label: 'Node 1', type: 'input', input: 'data', output: 'result', description: 'First node' },
    { id: '2', label: 'Node 2', type: 'process', input: 'result', output: 'output', description: 'Second node' },
  ]);
  const [connections, setConnections] = useState([
    { from: '1', to: '2' },
  ]);

  const handleExportFlow = () => {
    const flowSpec = {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.label,
        type: node.type,
        input: node.input,
        output: node.output,
        description: node.description,
      })),
      connections: connections.map(connection => ({
        from: connection.from,
        to: connection.to,
      })),
    };

    const yamlStr = yaml.dump(flowSpec);
    const data = new Blob([yamlStr], { type: 'text/yaml' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'flow_spec.yaml');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <h1>Flow Editor</h1>
      <button onClick={handleExportFlow}>Export Flow</button>
    </div>
  );
};

export default FlowEditor;