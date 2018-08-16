import React from 'react';
import axios from 'axios';

//Components
import FromInput from './components/form';

//Jsons  test data
import form from './public/json/form.json';

export default class Router extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formData : form,
            multiple : [],
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formData : nextProps.formData || []
        })        
    }

    testResult( testFormObject ){
        console.log( testFormObject );
    }

    testCancel(){
        console.log('Cancel');
    }

    testMultipleSearch(name,val){
        let formData = Object.assign([],this.state.formData);
        switch( name ){
            case "multiple":
                this.ajax( 'get','./public/json/data.json' ).then(res=>{
                    formData.map((item,i)=>{
                        if( item['name']==name ){
                            item['data'] = res['multiple']
                        }
                    })
                    this.setState({
                        formData
                    })
                })
                break;

            default:
                break;
        }
    }

    ajax(method,url,params){
        const token    = `Bearer ${sessionStorage.getItem('token') || ""}`;
        return axios({
            method     : method,
            url        : url,
            headers    : {
                Authorization: token
            },
            params     : params || ""
        }).then(res => {
            return res['data'];
        });
    }

    render(){
        return(
            <div className="wrap-popup">
                <FromInput 
                    data             = { this.state.formData }
                    multipleSearch   = { this.testMultipleSearch.bind(this) }
                    result           = { this.testResult.bind(this) }
                    cancel           = { this.testCancel.bind(this) }
                />
            </div>
        )
    }
}