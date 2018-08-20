import React from 'react';

//Components
import Time     from './time';
import Controls from './controls';
import Timeline from './timeline';

//stylesheet
import './audio.scss';

//let audio = new Audio();

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.audio = React.createRef();
        this.state = {
            audio                : "",
            nowControlsStatus    : 'play',
            src                  : props.src             || "",
            changeOptionBtn      : props.changeOptionBtn || false,
            duration             : 0,
            currentTime          : 0,
        }
    }

    componentDidMount() {
        this.setState({
            audio : this.audio.current
        },()=>{
            this.initAudio();
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            src : nextProps.src   || "",
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let src          = this.state.src;
        let prevStateSrc = prevState.src;

        if( prevStateSrc!=src ){
            this.setState({
                nowControlsStatus : "play"
            })
        }
    }

    playStatus(){
        let audio = this.state.audio;
        let nowControlsStatus  = this.state.nowControlsStatus;

        if( nowControlsStatus=="play" ){
            audio.play();
        }else{
            audio.pause();
        }
    }

    changeOption(status){
        if( this.props.changeOption!=undefined ){
            this.props.changeOption(status);
        }
    }

    initAudio(){
        let audio = this.state.audio;

        const setState = ( state ) => {
            this.setState(state);
        }

        audio.onloadeddata = () => {
            setState({ duration : audio.duration });
        }
        
        audio.ontimeupdate = () => {
            setState({ currentTime : audio.currentTime });
        }

        audio.onplaying    = () => {
            setState({ nowControlsStatus : "pause" });
        }

        audio.onpause      = () => {
            setState({ nowControlsStatus : "play" });
        }

        audio.onended      = () => {
            setState({ currentTime : 0 });
        }
    }

    resultCurrentTime( time ){
        let audio = this.state.audio;
        audio.currentTime = time;
    }

    render(){
        return(
            <div className="audio-wrap">
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
                <audio ref={this.audio} className="audio" src={this.state.src}/>   
            </div>
        );
    }
}