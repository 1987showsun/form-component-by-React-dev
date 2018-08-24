import React from 'react';
import { FaAngleLeft,FaAngleRight,FaAngleDoubleLeft,FaAngleDoubleRight }  from 'react-icons/fa';

//Javascripts
import { checkDate } from './checkFormat.js';

export default class Head extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            year    : props.year,
            month   : props.month,
        }
    }

    componentDidMount() {
        let sss = ['year','month'];
        for( let i=0 ; i<sss.length ; i++ ){
            this.result(sss[i]);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            year    : nextProps.year,
            month   : nextProps.month
        })
    }

    changeDate(type,btnStatus){
        let date  = Number( this.state[type] );
        let range = type=="year"? "" : 12;
        
        switch (btnStatus) {
            case "prev":
                date--;
                if( type=="month" ){
                    if( date<1 ){
                        date = range;
                    }
                }else{
                    if( date<1 ){
                        date = 1;
                    }
                }
                break;
        
            default:
                date++;
                if( type=="month" ){
                    if( date>range ){
                        date = 1;
                    }
                }
                break;
        }

        this.setState({
            [ type ] : checkDate(type,date),
        },()=>{
            this.result(type);
        })
    }

    result(type){
        if( this.props.result!=undefined ){
            this.props.result( type,this.state[type] );
        }
    }

    openList(type){
        if( this.props.openList!=undefined ){
            this.props.openList( type );
        }
    }

    render(){
        return(
            <div className="calendar-head">
                <div className="calendar-head-btn calendar-btn-prev" onClick={this.changeDate.bind(this,"year","prev")}><FaAngleDoubleLeft /></div>
                <div className="calendar-head-btn calendar-btn-prev" onClick={this.changeDate.bind(this,"month","prev")}><FaAngleLeft /></div>
                <div className="calendar-title">
                    <span className="head-result" onClick={this.openList.bind(this,"year")}>{`${this.state.year}`}</span>
                     / 
                    <span className="head-result" onClick={this.openList.bind(this,"month")}>{`${this.state.month}`}</span>
                </div>
                <div className="calendar-head-btn calendar-btn-next" onClick={this.changeDate.bind(this,"month","next")}><FaAngleRight /></div>
                <div className="calendar-head-btn calendar-btn-next" onClick={this.changeDate.bind(this,"year","next")}><FaAngleDoubleRight /></div>
            </div>
        );
    }
}