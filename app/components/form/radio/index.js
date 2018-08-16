import React from 'react';

//Stylesheets
import './radio.scss';

export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type         : props.type,
            name         : props.name        || "",
            required     : props.required    || false,
            data         : props.data        || [],
            [props.name] : props.value       || "",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data         : nextProps.data     || []
        })
    }

    handleChange(e){
        const name   = e.target.name;
        const value  = e.target.value;
        this.setState({
            [name] : value
        },()=>{
            if( this.props.result!=undefined ){
                this.props.result( name,value );
            }
        })
    }

    render(){
        return(
            <div className="radio-wrap">
                {
                    this.state.data.map((item,i)=>{
                        return (
                            <div className="input-radio" key={i}>
                                <input 
                                    key       = {i}
                                    type      = { this.state.type } 
                                    name      = { this.state.name } 
                                    value     = { item['value'] }
                                    checked   = { 
                                        this.state[this.state.name]==""?(
                                            i==0 &&
                                                true
                                        ):(
                                            item['value']==this.state[this.state.name] &&
                                                true
                                        )
                                    }
                                    onChange  = { this.handleChange.bind(this) }
                                />
                                <span class="checkmark"></span>
                                { item['name'] }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}