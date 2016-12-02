import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// const Greeting = () =>{
//   return (
//     <div>THETUT</div>
//   );
// }

// path / will show App AND PostsIndex
// path /greet will show App AND Greeting
//because /greet is a child of /, need to open App and tell where it's gonna show
//
// export default (
//   <Route path='/' component={App}>
//     <IndexRoute component={PostsIndex} />
//     <Route path='greet' component={Greeting} />
//     <Route path='greet2' component={Greeting} />
//     <Route path='greet3' component={Greeting} />
//   </Route>
// );



export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path='posts/new' component={PostsNew} />
    <Route path='posts/:id' component={PostsShow} />
  </Route>

);
