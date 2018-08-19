import React from 'react';

import './note.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            msg          : props.msg         || [],
            noteDisplay  : props.noteDisplay || false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            msg          : nextProps.msg            || [],
            noteDisplay  : nextProps.noteDisplay    || false,
        })
    }

    render(){
        if( this.state.noteDisplay ){
            return(
                <div className={`form-note`}>
                    <div className="form-note-wrap">
                        <ul>
                            { this.state.msg }
                        </ul>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }
}