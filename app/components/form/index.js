import React              from 'react';

//Components
import Multiple          from './multiple';
import Input             from './input';
import Radio             from './radio';
import Textarea          from './textarea';
import Datetime          from './datetime';
import Select            from './select';

import './style.scss';

export default class Test extends React.Component{

    constructor(props){
        super(props);

        let formObject = {};
        let data       = props.data;
        data.map((item,i)=>{
            formObject = { ...formObject , [item["name"]] : item["value"] }
        });

        const labelSwitch = data.some((item,i)=>{
            return item["label"] != "" && item["label"]!= undefined;
        })

        this.state = {
            data,
            formObject     : formObject,
            labelSwitch    : labelSwitch
        }
    }

    onSubmit(e){
        e.preventDefault();
        const formObject = Object.assign({},this.state.formObject);
        if( this.props.result!=undefined ){
            this.props.result(formObject);
        }
    }

    multipleResult(data){
        this.result( data['name'],data['selectedId'] );
    }

    result(name,value){
        const formObject = this.state.formObject;
        formObject[name] = value;
        this.setState({
            formObject
        });
    }

    renderComponent(type,item,i){
        switch(type){
            case 'multiple':
                return(
                    <Multiple 
                        key            = {i}
                        required       = { item['required'] || false }
                        name           = { item['name'] }
                        initVal        = { item['value'] }
                        optionData     = { item['data'] }
                        placeholder    = { item['placeholder'] }
                        multipleResult = { this.multipleResult.bind(this) }
                        multipleSearch = { this.props.multipleSearch }
                    />
                );
                break;

            case 'textarea':
                return(
                    <Textarea 
                        key            = {i}
                        required       = { item['required'] || false }
                        type           = { item['type'] }
                        name           = { item['name'] } 
                        value          = { item['value'] } 
                        placeholder    = { item['placeholder'] }
                        result         = { this.result.bind(this) }
                    />     
                );
                break;

            case 'select':
                return(
                    <Select 
                        key            = {i}
                        required       = { item['required'] || false }
                        type           = { item['type'] }
                        name           = { item['name'] } 
                        value          = { item['value'] } 
                        optionData     = { item['data'] }
                        placeholder    = { item['placeholder'] }
                        result         = { this.result.bind(this) }
                    />     
                );
                break;

            case 'radio':
                return(
                    <Radio 
                        key            = {i}
                        required       = { item['required'] || false }
                        type           = { item['type'] }
                        name           = { item['name'] }
                        value          = { item['value'] }
                        data           = { item['data'] }
                        placeholder    = { item['placeholder'] }
                        result         = { this.result.bind(this) }
                    />
                );
                break;

            case 'date' :
                return(
                    <Datetime
                        key            = {i}
                        required       = { item['required'] || false }
                        name           = { item['name'] }
                        type           = { item['type'] }
                        value          = { item['value'] }
                        placeholder    = { item['placeholder'] }
                        showTime       = { item['showTime'] || false }
                        result         = { this.result.bind(this) }
                    />
                );
                break;

            default:
                return(
                    <Input
                        key            = {i}
                        required       = { item['required']    || false }
                        type           = { item['type'] }
                        name           = { item['name'] }
                        value          = { item['value'] }
                        placeholder    = { item['placeholder'] }
                        doubleCheck    = { item['doubleCheck'] || false }
                        result         = { this.result.bind(this) }
                    />
                );
                break;
        }
    }

    children(type,item){
        if( type=="select" ){

            let formObject = this.state.formObject;
            let data       = this.state.data;
            let name       = item['name'];
            let children   = item['children'];
            let value      = formObject[name];

            if( value!="" ){
                return data.map(dataItem=>{
                    if( dataItem['name']==name ){
                        if( dataItem.hasOwnProperty('children') ){
                            return dataItem['children'].map((childrenItem,c)=>{
                                if( childrenItem['key']==value ){
                                    return this.renderComponent( childrenItem['type'],childrenItem,c )
                                }
                            })
                        }
                    }
                })
            }
        }
    }

    render(){
        return(
            <form className={`sun-dev-form-component `} onSubmit={ this.onSubmit.bind(this) }>
                <ul className="form-ul">
                    {
                        this.state.data.map((item,i)=>{
                            if( item['label']!="" && item["label"]!= undefined ){
                                return(
                                    <li key={i}>
                                        <ul>
                                            <li className="label">{item['label'] || "No label"}</li>
                                            <li>
                                                {this.renderComponent(item['type'],item,i)}
                                                {this.children(item['type'],item)}
                                            </li>
                                        </ul>
                                    </li>
                                );
                            }else{
                                return(
                                    <li key={i}>
                                        {this.renderComponent(item['type'],item,i)}
                                        {this.children(item['type'],item)}
                                    </li>
                                );
                            }
                        })
                    }
                    <li>
                        <span className="formBtn cancel" onClick={this.props.cancel.bind(this)}>Cancel</span>
                        <button type="submit">Submit</button>
                    </li>
                </ul>
            </form>
        );
    }
}