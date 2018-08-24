import React from 'react';
import { FaAngleLeft,FaAngleRight } from 'react-icons/fa';

export default class Head extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type : props.type
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            type : nextProps.type
        })
    }

    render(){
        return(
            <div className="calendar-head">
                <div className="calendar-head-btn calendar-btn-prev year-month-btn prev" onClick={ this.props.back.bind(this) }>
                    <FaAngleLeft />
                    <span className="calendar-head-btn-text">Back</span>
                </div>
                <div className="calendar-title">
                    <span className="head-result">{`${this.state.type}`}</span>
                </div>
                <div className="calendar-head-btn calendar-btn-next year-month-btn next" style={{"visibility":"hidden"}}></div>
            </div>
        );
    }
}