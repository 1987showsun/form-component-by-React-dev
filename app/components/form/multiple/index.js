import React from 'react';
import { FaTrash } from 'react-icons/fa';

//Components
import Item from './item';

import './multiple.scss';

let delayTime;

export default class Multiple extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            [props.name]              : "",
            name                      : props.name          || "",
            placeholder               : props.placeholder   || "",
            initVal                   : props.initVal       || [],
            optionData                : props.optionData    || [],
            itemWrapStatus            : false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optionData    : nextProps.optionData ,
        })
    }

    handleChange(e){
        const name  = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        },()=>{
            if( this.props.multipleSearch!=undefined ){
                this.props.multipleSearch( name,value );
            }
        })
    }

    selected( selectedItem ){
        let initVal   = Object.assign([],this.state.initVal);
        let addStatus = initVal.some(item=>{
            return item['id'] == selectedItem['id'];
        })
        if( !addStatus ){

            initVal = [ ...initVal , {'id' : selectedItem['id'], 'value' : selectedItem['value']} ];

            this.setState({
                initVal : initVal
            },()=>{
                this.selectOptionResult(initVal);
            })
        }
    }

    remove( id ){
        const initVal = Object.assign([],this.state.initVal);
        const result  = initVal.filter((item,i)=>{
            return item['id'] != id;
        })
        this.setState({
            initVal : result
        },()=>{
            this.selectOptionResult(result);
        })
    }

    selectOptionResult( initVal ){
        const name = this.state.name;
        this.setState({
            initVal  : initVal
        },()=>{
            const result = {
                name            : name,
                selected        : initVal,
                selectedId      : initVal.map(item=>{return item['id']}).toString(),
                selectedValue   : initVal.map(item=>{return item['value']}).toString(),
            }
            if( this.props.multipleResult!=undefined ){
                this.props.multipleResult(result);
            }
        })
    }

    itemWrapStatus2( status ){
        this.setState({
            itemWrapStatus : status=="focus"? true : false
        })
    }

    render(){
        console.log(this.state.initVal);
        return(
            <div className={`multiple-wrap ${this.state.itemWrapStatus}`} onBlur={this.itemWrapStatus2.bind(this,'blur')} onFocus={this.itemWrapStatus2.bind(this,'focus')} tabIndex={0}>
                <div className="input-box">
                    {
                        this.state.initVal.map((item,i)=>{
                            return(
                                <div key={i} className="multiple-selected-option">
                                    {item['value']}
                                    <span className="remove" onClick={this.remove.bind(this,item['id'])}>
                                        <FaTrash />
                                    </span>
                                </div>
                            );
                        })
                    }
                    <input type="text" name={this.state.name} value={this.state[this.state.name]} onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder} autoComplete="off"/>
                </div>
                
                <Item
                    name            = {this.state.name}
                    initVal         = {this.state.initVal}
                    optionData      = {this.state.optionData}
                    selectOption    = { this.selectOptionResult.bind(this) }
                />
            </div>
        );
    }
}