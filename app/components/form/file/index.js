import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';

import Audio from './audio';
import Video from './video';

import './file.scss';

let reader = new FileReader();

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            type                  : props.type         || "",
            name                  : props.name         || "",
            required              : props.required     || false,
            placeholder           : props.placeholder  || "",
            accept                : props.accept       || "file_extension",
            [`${props.name}Src`]  : "",
            [props.name]          : {}
        }
    }

    handleChange(e){
        const name       = e.target.name;
        const value      = e.target.files[0];

        if( value!=undefined ){
            const url        = reader.readAsDataURL(value);
            reader.onloadend = (e)=> {
                this.setState({
                    placeholder       : value['name'],
                    [`${name}Src`]    : reader.result,
                    [name]            : value
                },()=>{
                    if( this.props.result!=undefined ){
                        this.props.result(name,value);
                    }
                })
            };
        }
    }

    changeOption(status){
        console.log( status );
    }

    showSelectFile(){

        const name         = this.state.name;
        const value        = this.state[name];
        const fileSrc      = this.state[`${name}Src`];
        const fileType     = value['type']==undefined? "" : value['type'].split('/')[0];
        const showPreview  = ['image','video','audio'];

        if( fileSrc!="" && showPreview.some(item=>{return item==fileType}) ){
            return(
                <div className="loading-preview">
                    {
                        fileType=="image" &&
                            <img src={fileSrc} alt={ this.state[name]['name'] } title="" />
                    }
                    {
                        fileType=="video" &&
                            <Video 
                                src             = { fileSrc }
                                changeOption    = { this.changeOption.bind(this) }
                                changeOptionBtn = { false }
                            />
                    }
                    {
                        fileType=="audio" &&
                            <Audio 
                                src             = { fileSrc }
                                changeOption    = { this.changeOption.bind(this) }
                                changeOptionBtn = { false }
                            />
                    }
                </div>
            ); 
        }else{
            return null;
        }
    }

    render(){
        return(
            <div className="file-wrap">
                {this.showSelectFile()}
                <div className="input-box">
                    <input type="file" name={this.state.name} accept={this.state.accept} onChange={this.handleChange.bind(this)} />
                    <div className={`placeholder`}>
                        <span className="placeholder-icon">
                            <FaFolderOpen />
                        </span>
                        {this.state.placeholder}
                    </div>
                </div>
            </div>
        );
    }
}