import React from 'react';
import { FaTrash } from 'react-icons/fa';

//Components
import Item from './item';

import './multiple.scss';

let delayTime;

export default class Multiple extends React.Component{

    constructor(props){
        super(props);
        this.multiple = React.createRef();
        this.state = {
            [props.name]              : "",
            name                      : props.name          || "",
            placeholder               : props.placeholder   || "",
            initVal                   : props.initVal       || [],
            optionData                : props.optionData    || [],
            itemWrapStatus            : false,
            overflow                  : "overflow_false",
        }
    }

    componentDidMount() {
        const initVal = this.state.initVal
        this.result(initVal);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optionData                : nextProps.optionData || [],
        })
    }

    handleChange(e){
        const name       = e.target.name;
        const value      = e.target.value;
        this.setState({
            [name] : value
        },()=>{
            if( this.props.multipleSearch!=undefined ){
                this.props.multipleSearch( name,value );
            }
        })
    }

    selected( selectedItem ){
        let initVal       = Object.assign([],this.state.initVal);
        let addStatus     = initVal.some(item=>{
            return item['value'] == selectedItem['value'];
        })
        if( !addStatus ){

            initVal = [ ...initVal , {'value' : selectedItem['value'], 'name' : selectedItem['name']} ];

            this.setState({
                initVal : initVal
            },()=>{
                this.result(initVal);
            })
        }
    }

    remove( value ){
        const initVal     = Object.assign([],this.state.initVal);
        const result      = initVal.filter((item,i)=>{
            return item['value'] != value;
        })
        this.setState({
            initVal : result
        },()=>{
            this.result(result);
        })
    }

    result( initVal ){
        const name = this.state.name;
        this.setState({
            initVal  : initVal
        },()=>{
            const result = {
                name            : name,
                selected        : initVal,
                selectedId      : initVal.map(item=>{return item['value']}).toString(),
                selectedValue   : initVal.map(item=>{return item['name']}).toString(),
            }
            if( this.props.multipleResult!=undefined ){
                this.props.multipleResult(result);
            }
        })
    }

    itemWrapStatus( status ){
        this.setState({
            itemWrapStatus : status=="focus"? true : false
        },()=>{
            let   _overflow             = "overflow_false";
            const _this_h               = $(this.multiple.current).parents().find('>.form-ul').innerHeight();
            const _multiple_select_h    = $(this.multiple.current).find('>.multiple-select').outerHeight();
            const _coordinate           = $(this.multiple.current).find('>.multiple-select').offset().top;
            const _total_end_coordinate = _coordinate + _multiple_select_h;
            if( _total_end_coordinate>_this_h ){
                _overflow = 'overflow_true';
            }
            this.setState({
                overflow : _overflow
            });
        })
    }

    render(){
        return(
            <div ref={this.multiple} className={`multiple-wrap ${this.state.itemWrapStatus} ${this.state.overflow}`} onBlur={this.itemWrapStatus.bind(this,'blur')} onFocus={this.itemWrapStatus.bind(this,'focus')} tabIndex={0}>
                <div className="input-box">
                    {
                        this.state.initVal.map((item,i)=>{
                            return(
                                <div key={i} className="multiple-selected-option">
                                    {item['name']}
                                    <span className="remove" onClick={this.remove.bind(this,item['value'])}>
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
                    selectOption    = { this.result.bind(this) }
                />
            </div>
        );
    }
}