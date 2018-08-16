import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

import './select.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data         : props.optionData  || [],
            name         : props.name,
            placeholder  : props.placeholder || "Please join placeholder in object",
            [props.name] : props.value,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data         : nextProps.optionData || [],
        })
    }

    handleChange(e){
        const name     = e.target.name;
        const value    = e.target.value;
        this.setState({
            [name]    : value
        },()=>{
            if( this.props.result!=undefined ){
                this.props.result(name,value);
            }
        })
    }

    render(){
        return(
            <div className="input-box select">
                <select name={this.state.name} onChange={this.handleChange.bind(this)} value={this.state[this.state.name]}>
                    <option value="">{this.state.placeholder}</option>
                    {
                        this.state.data.map((item,i)=>{
                            return(
                                <option key={i} value={item['value']}>{item['name']}</option>
                            );
                        })
                    }
                </select>
                <span className="select-icon"><FaChevronDown /></span>
            </div>
        );
    }
}