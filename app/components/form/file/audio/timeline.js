import React from 'react';

export default class Timeline extends React.Component{

    constructor(props){
        super(props);
        this.timeLineWrap  = React.createRef();
        this.state = {
            duration    : props.duration       || 0,
            currentTime : props.currentTime    || 0,
            runWidth    : 0,
        }
    }

    componentDidMount() {
        this.setTimeLineWrap();
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            duration    : nextProps.duration       || 0,
            currentTime : nextProps.currentTime    || 0
        },()=>{
            this.setTimeLineWrap();
            this.touchTimeLine();
        })
    }

    setTimeLineWrap(){
        let duration       = this.state.duration;
        let currentTime    = this.state.currentTime;
        this.setState({
            runWidth : (currentTime/duration)*100
        });
    }

    touchTimeLine(){

        let _this              = this;
        let _touchWrap         = 0;
        let _touchWrapoffset   = 0;
        let _touchTotalWidth   = 0;
        let _touchNowCoordinate= 0;
        let _touchSwitch       = false;
        let _set_w             = 0;

        $(this.timeLineWrap.current).off().on({
            mousedown(e){
                _touchWrap             = $(this).width();
                _touchWrapoffset       = $(this).offset().left;
                _touchTotalWidth       = _touchWrap + _touchWrapoffset;
                _touchNowCoordinate    = e.pageX;
                _touchSwitch           = true;
                
                $('body,html').off().on({
                    mousedown(e){
                        if( _touchSwitch ){
                            _touchNowCoordinate    = e.pageX;
                            _set_w   = _touchNowCoordinate - _touchWrapoffset;
                            _this.setState({
                                runWidth : (_set_w/_touchWrap)*100
                            },()=>{
                                _this.nowSetCurrentTime();
                            });
                        }
                    },

                    mousemove(e){
                        if( _touchSwitch ){
                            _touchNowCoordinate     = e.pageX;
                            if( _touchNowCoordinate<=_touchTotalWidth && _touchNowCoordinate>=_touchWrapoffset  ){
                                _set_w = _touchNowCoordinate - _touchWrapoffset;
                                _this.setState({
                                    runWidth : (_set_w/_touchWrap)*100
                                },()=>{
                                    _this.nowSetCurrentTime();
                                });
                            }
                        }
                    },

                    mouseup(e){
                        _touchSwitch = false;
                    }
                })
            }
        })
    }

    nowSetCurrentTime(){

        let duration         = this.state.duration;
        let currentTime      = this.state.currentTime;
        let runWidth         = this.state.runWidth;
        let jumpCurrentTime  = duration*(runWidth/100) ;

        if( this.props.resultCurrentTime!=undefined ){
            this.props.resultCurrentTime(jumpCurrentTime);
        }
    }

    render(){
        return(
            <div ref={this.timeLineWrap} className="timeline-wrap">
                <div className="timeline-now-play" style={{ "width": `${this.state.runWidth}%` }}>
                    <span className="do"></span>
                </div>
            </div>
        );
    }
}