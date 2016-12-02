import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

//['title', 'categories', 'content'];
const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Categories for Post'
  },
  content: {
    type: 'textarea',
    label: 'Content for Post'
  }
};



class PostsNew extends Component {

  //react see when we create PostsNew, we declared contextTypes
  //react will search all parents until it finds a parent that has
  //context router, in this case it will be in index.js which has <Router>
  //try avoiding using context, only use with router
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props){
    //this.props.createPost(props) returns a promise
    //when promise is return => post created
    this.props.createPost(props)
      .then(() =>{
        //post created, navigate to index
        //navigate by this.context.router.push with the new path to navigate to
        this.context.router.push('/');
      });
  }

  //refactor for markups
  renderField(fieldConfig, field){
    //provided by redux form-group
    //fieldConfig.type will be input or text area
    const fieldHelper = this.props.fields[field];
    return(
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type='text' className='form-control' {...fieldHelper} />
        <div className='text-help'>
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render(){
    //same as const handleSubmit  = this.props.handleSubmit;
    //const {handleSubmit}  = this.props;

    //const {fields: {title, categories, content}, handleSubmit}  = this.props;

    //{...title} is destructuring.
    //title includes onChange, onBlue, onFocus, ...
    //by using the notation above, it's the same as include all
    //onChange=title.onChange, onBlur = title.onBlur, and so on

    //touched means if user ever changes the input
    //only print error if error exist and input is touched
    //if touched == true, then return error, otherwise dont show anything
    //when this is used, click title field, then click somewhere else
    //it will show the error

    //<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
    //if title is touched, and is invalid, add class has-danger,
    //basically just css to make div outline red
    // return(
    //   <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
    //     <h3>Create new post</h3>
    //     <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
    //       <label>Title</label>
    //       <input type='text' className='form-control' {...title} />
    //       <div className='text-help'>
    //         {title.touched ? title.error : ''}
    //       </div>
    //     </div>
    //
    //     <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
    //       <label>Categories</label>
    //       <input type='text' className='form-control' {...categories}/>
    //       <div className='text-help'>
    //         {categories.touched ? categories.error : ''}
    //       </div>
    //     </div>
    //
    //     <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
    //       <label>Content</label>
    //       <textarea type='text' className='form-control' {...content}/>
    //       <div className='text-help'>
    //         {content.touched ? content.error : ''}
    //       </div>
    //     </div>
    //
    //     <button type='submit' className='btn btn-primary'>Submit</button>
    //     <Link to='/' className='btn btn-danger'>Cancel</Link>
    //   </form>
    // );


    //refactor
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create new post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );


  }
}

function validate(values){
  const errors={};
  // if(!values.title){
  //   errors.title = 'Enter title';
  // }
  // if(!values.categories){
  //   errors.categories = 'Enter categories';
  // }
  // if(!values.content){
  //   errors.content = 'Enter content';
  // }

  //refactor:
  _.each(FIELDS, (type, field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`;
    }
  }

  )
  return errors;
}

//connect 1st arg is mapStatetoProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStatetoProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNew',//name can be whatever, needs to be unique from different forms
  fields: _.keys(FIELDS),//return all the keys in an array
                        //different pieces the form is going to contain, look at const up top
                        //simple way is fields: ['title', 'categories', 'content']
                        //do this to remove redundant code for validation and markups
  validate //validate form
}, null, {createPost})(PostsNew);
