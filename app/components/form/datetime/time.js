import React                      from 'react';
import { FaCaretUp,FaCaretDown }  from 'react-icons/fa';

export default class Time extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            timeArray  : ['hrs','min','sec'],
            showTime   : props.showTime,
            hrs        : props.hrs,
            min        : props.min,
            sec        : props.sec,
            afterHrs   : props.afterHrs,
            afterMin   : props.afterMin,    
            afterSec   : props.afterSec
        }
    }

    componentDidMount() {
        this.result();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hrs        : nextProps.hrs,
            min        : nextProps.min,
            sec        : nextProps.sec
        })
    }

    handleChange(e){
        const name   = e.target.name;
        const value  = e.target.value;
        this.setState({
            [name]   : value
        },()=>{
            this.result();
        })
    }

    changeTime(type,btnStatus){

        let time  = Number(this.state[type]);
        let range = type=="hrs"? 23 : 59;

        switch(btnStatus){
            case "up":
                time--;
                if( time<0 ){
                    time = range;
                }
                break;
            
            default:
                time++;
                if( time>range ){
                    time = 0;
                }
                break;
        }

        this.setState({
            [type] : String(time).length<2? `0${time}` : time
        },()=>{
            this.result();
        })
    }

    result(){
        const timeArray = this.state.timeArray;
        if( this.props.result!=undefined ){
            for( let i=0 ; i<timeArray.length ; i++ ){
                this.props.result( timeArray[i] , this.state[timeArray[i]] );
            }
        }
    }

    render(){
        const showTime  = this.state.showTime;
        if( showTime ){
            return(
                <div className="calendar-time">
                    <ul>
                        <li>
                            <div className="input-box">
                                <input type="text" name="hrs" value={this.state.hrs} onChange={this.handleChange.bind(this)}/>
                                <div className="calendar-time-btn-wrap">
                                    <span className="calendar-time-btn calendar-time-btn-prev" onClick={this.changeTime.bind(this,"hrs","up")}><FaCaretUp /></span>
                                    <span className="calendar-time-btn calendar-time-btn-next" onClick={this.changeTime.bind(this,"hrs","down")}><FaCaretDown /></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="input-box">
                                <input type="text" name="min" value={this.state.min} onChange={this.handleChange.bind(this)}/>
                                <div className="calendar-time-btn-wrap">
                                    <span className="calendar-time-btn calendar-time-btn-prev" onClick={this.changeTime.bind(this,"min","up")}><FaCaretUp /></span>
                                    <span className="calendar-time-btn calendar-time-btn-next" onClick={this.changeTime.bind(this,"min","down")}><FaCaretDown /></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="input-box">
                                <input type="text" name="sec" value={this.state.sec} onChange={this.handleChange.bind(this)}/>
                                <div className="calendar-time-btn-wrap">
                                    <span className="calendar-time-btn calendar-time-btn-prev" onClick={this.changeTime.bind(this,"sec","up")}><FaCaretUp /></span>
                                    <span className="calendar-time-btn calendar-time-btn-next" onClick={this.changeTime.bind(this,"sec","down")}><FaCaretDown /></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        }else{
            return null;
        }
    }
}