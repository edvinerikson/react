const React = require('./build/packages/react');
const server = require('./build/packages/react-dom/server');

class AsyncData extends React.Component {
  constructor() {
    super();
    this.state = {data: 'not loaded'};
  }

  componentWillMount() {
    return Promise.resolve({ data: 'hello'}).then((data) => {
      this.setState(data);
    });
  }

  render() {
    return React.createElement('h1', null, this.state.data);
  }
}

server.renderToString(
  React.createElement('div', null, React.createElement('h1'), React.createElement(AsyncData))
).then(data => console.log(data))
.catch(err => console.log(err));


// const stack = [];
// let count = 0;
// async function run() {

//   while (true) {
//     const frame = await stack[stack.length - 1];
//     console.log(frame);
//     if (count === 10) {
//       break;
//     } else {
//       count++;
//       stack.push(Promise.resolve(count));
//     }
//   }
// };

// run();
