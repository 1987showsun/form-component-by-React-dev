import React from 'react';
import { FaAngleLeft,FaAngleRight,FaCaretUp,FaCaretDown,FaAngleDoubleLeft,FaAngleDoubleRight }  from 'react-icons/fa';

export default class Head extends React.Component{

    constructor(props){

        let _date     = new Date();
        let initYear  = _date.getFullYear();
        let initMonth = String( _date.getMonth()+1 ).length <2 ? `0${_date.getMonth()+1}` : _date.getMonth();

        super(props);
        this.state = {
            year    : initYear,
            month   : initMonth
        }
    }

    componentDidMount() {
        this.result();
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
            [ type ] : String(date).length<2? `0${date}` : date
        },()=>{
            this.result();
        })
    }

    result(){
        const date = `${this.state.year}-${this.state.month}`;
        
        if( this.props.result!=undefined ){
            this.props.result( "date",date );
        }
    }

    render(){
        return(
            <div className="calendar-head">
                <div className="calendar-head-btn calendar-btn-prev" onClick={this.changeDate.bind(this,"year","prev")}><FaAngleDoubleLeft /></div>
                <div className="calendar-head-btn calendar-btn-prev" onClick={this.changeDate.bind(this,"month","prev")}><FaAngleLeft /></div>
                <div className="calendar-title">{`${this.state.year} / ${this.state.month}`}</div>
                <div className="calendar-head-btn calendar-btn-next" onClick={this.changeDate.bind(this,"month","next")}><FaAngleRight /></div>
                <div className="calendar-head-btn calendar-btn-next" onClick={this.changeDate.bind(this,"year","next")}><FaAngleDoubleRight /></div>
            </div>
        );
    }
}