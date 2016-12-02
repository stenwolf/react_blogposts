import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router';

class PostsIndex extends Component{

  //life cycle method, will be invoked by react when rendered first time
  componentWillMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    return this.props.posts.map((post) => {
      return (
          <li className='list-group-item' key ={post.id}>
            <Link to={'posts/' + post.id}>
              <span className='pull-xs-right'>{post.categories}</span>
              <strong>{post.title}</strong>
            </Link>
          </li>
      );
    });
  }

  //Link in react router serves as <a>, this is used to link routes
  render(){
    return (
      <div>
        <div className='text-xs-right'>
          <Link to='/posts/new' className='btn btn-primary'>Add a Post</Link>
        </div>
        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    posts: state.posts.all
  };
}

//this is same as below
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);

//this is same as below
//export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);


// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchPosts}, dispatch);
// }

//export default connect(null, mapDispatchToProps)(PostsIndex);
