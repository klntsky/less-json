import blessed from 'blessed';
import * as contrib from 'blessed-contrib';

export default async function (jsonPayload) {

  let label = 'JSON structure';
  {
    // Create a new Error object to capture the stack trace
    const error = new Error();

    // Get the stack trace from the error object
    const stack = error.stack || '';

    // Split the stack trace into individual lines
    const stackLines = stack.split('\n');

    // Check if the stack trace has at least 3 lines
    if (stackLines.length >= 3) {
      // Return the line containing the caller's position (second line)
      label = stackLines[2].trim();
    }
  }

  return new Promise((resolve, reject) => {
    // Create a screen object.
    const screen = blessed.screen({
      smartCSR: true,
      title: 'JSON Tree Viewer'
    });

    // Create a tree view using blessed-contrib.
    const tree = contrib.tree({
      label,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      style: {
        text: "white",
        selected: {
          bg: "white",
          fg: "black"
        }
      }
    });

    // Append the tree to the screen.
    screen.append(tree);

    // Function to convert JSON to tree nodes.
    function jsonToTreeNodes(json, parentKey = '') {
      if (typeof json !== 'object' || json === null) {
        return { name: ` ${parentKey}: ${json}` };
      }

      const nodes = {};
      for (const key in json) {
        nodes[key] = jsonToTreeNodes(json[key], key);
      }

      return {
        name: ' ' + parentKey,
        extended: false,
        children: nodes
      };
    }

    function processJSON(json) {
      const treeNodes = jsonToTreeNodes(json);
      tree.setData({
        extended: true,
        children: {
          root: treeNodes
        }
      });
      screen.render();
    }

    processJSON(jsonPayload);

    screen.key(['escape', 'q', 'C-c'], () => {
      screen.destroy();
      resolve();
    });

    tree.focus();
    screen.render();
  });
};
