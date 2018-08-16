import React from 'react';

export default class Index extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            type         : props.type,
            name         : props.name,
            required     : props.required,
            placeholder  : props.placeholder,
            pass         : true,
            [props.name] : props.value,
        }
    }

    handleChange(e){
        const type  = this.state.type;
        const name  = e.target.name;
        const value = e.target.value;
        let   pass  = false;

        switch(type){
            case 'number':
                pass = numberCheck(value);
                break;

            default : 
                pass = true;
                break;
        }
        if( pass ){
            this.setState({
                [name] : value
            },()=>{
                if( this.props.result!=undefined ){
                    this.props.result(name,value);
                }
            })
        }
    }

    blur(type){
        let name     = this.state.name;
        let value    = this.state[name];
        let pass     = this.state.pass;
        
        switch( type ){
            case 'number':
                pass   = numberCheck(value);
                break;
            
            case 'mail':
                pass   = mailCheck(value);
                break;
        }

        this.setState({
            pass
        })
    }
    
    render(){
        return(
            <div className={`input-box ${this.state.pass}`}>
                <input 
                    type        = { this.state.type=="password"? "password" : "text" }
                    name        = { this.state.name=="name"?     "name"     : this.state.name }
                    value       = { this.state[this.state.name] }
                    placeholder = { this.state.placeholder}
                    onBlur      = { this.blur.bind(this,this.state.type) }
                    onChange    = { this.handleChange.bind(this) }
                />
            </div>
        )
    }
}

const numberCheck = (value) => {
    const checkNaN = Number(value);
    return isNaN(checkNaN)? false : true;
}

const mailCheck = (value) => {
    const re   = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}