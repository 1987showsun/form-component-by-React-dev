import React from 'react';

//Components
import Time     from './time';
import Controls from './controls';
import Timeline from './timeline';

//Stylesheets
import './video.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.video = React.createRef();
        this.state = {
            video                : "",
            nowControlsStatus    : 'play',
            src                  : props.src             || "",
            changeOptionBtn      : props.changeOptionBtn || false,
            duration             : 0,
            currentTime          : 0,
        }
    }

    componentDidMount() {
        this.setState({
            video : this.video.current
        },()=>{
            this.initAudio();
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            src : nextProps.src   || "",
        })
    }

    playStatus(status){
        let video = this.state.video;
        let nowControlsStatus  = this.state.nowControlsStatus;
        if( nowControlsStatus=="play" ){
            video.play();
        }else{
            video.pause();
        }
    }

    changeOption(status){
        if( this.props.changeOption!=undefined ){
            this.props.changeOption(status);
        }
    }

    initAudio(){
        let video = this.state.video;
        const setState = ( state ) => {
            this.setState(state);
        }

        video.onloadeddata = () => {
            setState({ duration : video.duration });
        }
        
        video.ontimeupdate = () => {
            setState({ currentTime : video.currentTime });
        }

        video.onplaying    = () => {
            setState({ nowControlsStatus : "pause" });
        }

        video.onpause      = () => {
            setState({ nowControlsStatus : "play" });
        }

        video.onended      = () => {
            setState({ currentTime : 0 });
        }
    }

    resultCurrentTime(time){
        let video = this.state.video;
        video.currentTime = time;
    }

    render(){
        return(
            <div className="video-wrap">
                <div className="controls-wrap">
                    <Controls 
                        changeOptionBtn   = { this.state.changeOptionBtn }
                        nowControlsStatus = { this.state.nowControlsStatus }
                        playStatus        = { this.playStatus.bind(this) }
                        changeOption      = { this.changeOption.bind(this) }
                    />
                    <Time wantChangeTime={ this.state.currentTime }/>
                    <Timeline 
                        duration          = { this.state.duration }
                        currentTime       = { this.state.currentTime }
                        resultCurrentTime = { this.resultCurrentTime.bind(this) }
                    />
                    <Time wantChangeTime={ this.state.duration }/>
                </div>

                <video ref={this.video} className="video" src={this.state.src} />
            </div>
        );
    }
}