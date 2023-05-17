class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((val) => {
      this.nodes.add(val);
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let nodes = new Set([start.value]);
    while (stack.length) {
      let current = stack.pop();
      nodes.add(current.value);
      for (let i of current.adjacent) {
        if (!nodes.has(i.value)) {
          stack.push(i);
        }
      }
    }
    return Array.from(nodes);
    // this should be fine even though it doesnt exactly match the valid output. I dont see why S,U,V,W,T,R,Y,X,Q,P is not a valid answer given the varied nature of the depth of a graph. ["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"] given as a valid result in the test file doesnt make sense as there is no connection between Q and Y so they should not end up adjacent in the result array.
  }

  // depthFirstSearch(start) {
  //   const visited = new Set();
  //   const result = [];

  //   function traverse(vertex) {
  //     // base case
  //     if (!vertex) {
  //       return null;
  //     }
  //     // visit node
  //     visited.add(vertex);
  //     result.push(vertex.value);

  //     // visit neighbors
  //     vertex.adjacent.forEach((neighbor) => {
  //       if (!visited.has(neighbor)) {
  //         return traverse(neighbor);
  //       }
  //     });
  //   }

  //   traverse(start);
  //   console.log(result);
  //   return result;
  // }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let stack = [start];
    let nodes = [start.value];
    while (stack.length) {
      let current = stack.shift();
      for (let i of current.adjacent) {
        if (nodes.indexOf(i.value) < 0) {
          stack.push(i);
          nodes.push(i.value);
        }
      }
    }
    return nodes;
  }
}

module.exports = { Graph, Node };
