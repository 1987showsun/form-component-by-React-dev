import React from 'react';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            type         : props.type,
            name         : props.name,
            [props.name] : props.value
        }
    }

    handleChange(e){
        const name   = e.target.name;
        const value  = e.target.value;
        this.setState({
            [name] : value
        },()=>{
            if( this.props.result !=undefined ){
                this.props.result(name,value);
            }
        })
    }

    render(){
        return(
            <div className="input-box">
                <textarea
                    name       = { this.state.name }
                    value      = { this.state[this.state.name] } 
                    onChange   = {this.handleChange.bind(this)}
                />
            </div>
        );
    }
}