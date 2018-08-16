import React                               from 'react';
import ReactDOM                            from 'react-dom';

//Components
import Test                                from './test';

//CSS
import './public/stylesheets/style.scss';

export default class Index extends React.Component{
  render(){
    return(
      <Test />
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));
