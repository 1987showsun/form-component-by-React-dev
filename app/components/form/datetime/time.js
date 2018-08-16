import React                      from 'react';
import { FaCaretUp,FaCaretDown }  from 'react-icons/fa';

export default class Time extends React.Component{

    constructor(props){
        let _date   = new Date();
        let initHr  = String( _date.getHours()   ).length <2 ? `0${_date.getHours()}`   : _date.getHours()  ;
        let initMin = String( _date.getMinutes() ).length <2 ? `0${_date.getMinutes()}` : _date.getMinutes();
        let initSec = String( _date.getSeconds() ).length <2 ? `0${_date.getSeconds()}` : _date.getSeconds();

        super(props);
        this.state = {
            hr     : initHr,
            min    : initMin,
            sec    : initSec
        }
    }

    componentDidMount() {
        this.result();
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
        let range = type=="hr"? 23 : 59;

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
        const time = `${this.state.hr}:${this.state.min}:${this.state.sec}`;
        if( this.props.result!=undefined ){
            this.props.result('time',time);
        }
    }

    render(){
        return(
            <div className="calendar-time">
                <ul>
                    <li>
                        <div className="input-box">
                            <input type="text" name="hr" value={this.state.hr} onChange={this.handleChange.bind(this)}/>
                            <div className="calendar-time-btn-wrap">
                                <span className="calendar-time-btn calendar-time-btn-prev" onClick={this.changeTime.bind(this,"hr","up")}><FaCaretUp /></span>
                                <span className="calendar-time-btn calendar-time-btn-next" onClick={this.changeTime.bind(this,"hr","down")}><FaCaretDown /></span>
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
    }
}