import Graph from '../implement-graph';
import Stats from 'stats-js';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);


const generateData = (nodeNum, edgeNum) => {
  const nodes = [], edges = [];
  for (let i = 0; i < nodeNum; i ++) {
    nodes.push({
      id: `${i}`,
      label: `${i}`,
      x: Math.random() * 500,
      y: Math.random() * 500,
    });
  }
  for (let i = 0; i < edgeNum; i ++) {
    edges.push({
      source: `${Math.floor(Math.random() * nodeNum)}`,
      target: `${Math.floor(Math.random() * nodeNum)}`,
    });
  }
  return { nodes, edges };
}

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
      labelCfg: {
        position: 'right',
        style: {
          stroke: "#0f0",
          lineWidth: 2,
        }
      }
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

describe('graph', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node'],
    },
  });
  graph.data(generateData(500, 1000));
  // graph.data(generateData(1, 0));
  graph.render();
  it('update node', () => {
    // graph.updateItem(graph.getNodes()[0], {
    //     label: 'abc',
    //     size: 10,
    //     labelCfg: {
    //       style: {
    //         fill:'#f00',
    //         lineWidth: 1,
    //         background: {
    //           fill: '#ffffff',
    //           stroke: '#9EC9FF',
    //           padding: 2,
    //           radius: 2,
    //         },
    //       }
    //     }
    //   })
    // })

    // fps monitor loops
    let count = 0;
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    let currentPos = 150;
    function animate() {
      stats.update();
      graph.getNodes().forEach((node, i) => {
        graph.updateItem(node, {
          label: 'abc',
          size: 10 + (count + i) % 5,
          labelCfg: {
            style: {
              fill:'#f00',
              lineWidth: (count + i) % 5,
              background: {
                fill: '#ffffff',
                stroke: '#9EC9FF',
                padding: (count + i) % 5,
                radius: 2,
              },
            }
          }
        })
      })
      count ++;
      requestAnimationFrame( animate );
    }
    requestAnimationFrame( animate );

    // setInterval(() => {
    //   count++
    //   graph.getNodes().forEach((node, i) => {
    //     graph.updateItem(node, {
    //       label: 'abc',
    //       size: 10 + (count + i) % 5,
    //       labelCfg: {
    //         style: {
    //           fill:'#f00',
    //           lineWidth: (count + i) % 5,
    //           background: {
    //             fill: '#ffffff',
    //             stroke: '#9EC9FF',
    //             padding: (count + i) % 5,
    //             radius: 2,
    //           },
    //         }
    //       }
    //     })
    //   })
    // }, 100)

  })
});
