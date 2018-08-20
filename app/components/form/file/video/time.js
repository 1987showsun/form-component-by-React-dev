import React from 'react';

export default class Time extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            wantChangeTime : props.wantChangeTime || 0,
            hrs  : "00",
            min  : "00",
            sec  : "00"
        }
    }

    componentDidMount() {
        this.calculate();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            wantChangeTime : nextProps.wantChangeTime   || 0,
        },()=>{
            this.calculate();
        })
    }

    calculate(){
        let wantChangeTime = this.state.wantChangeTime;
        let sec = parseInt(wantChangeTime%60);
        let min = parseInt(wantChangeTime/60);
        let hrs = parseInt(min/60);
        this.setState({
            hrs : String(hrs).length<2? `0${hrs}`:hrs,
            min : String(min).length<2? `0${min}`:min,
            sec : String(sec).length<2? `0${sec}`:sec,
        })
    }

    render(){
        return(
            <div className="time">{`00:${this.state.min}:${this.state.sec}`}</div>
        );
    }
}