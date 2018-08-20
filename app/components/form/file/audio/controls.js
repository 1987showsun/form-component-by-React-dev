import React from 'react';
import { FaPlay,FaPause,FaStepBackward,FaStepForward } from 'react-icons/fa';

export default class Controls extends React.Component{

    constructor(props){
        super(props);
        this.controls = React.createRef();
        this.state = {
            changeOptionBtn : props.changeOptionBtn   || false,
            playStatus      : props.nowControlsStatus || "play",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            playStatus : nextProps.nowControlsStatus || "play",
        })
    }

    handleChange(status){
        if( this.props.changeOption!=undefined ){
            this.props.changeOption(status);
        }
    }

    render(){
        const changeOptionBtn = this.state.changeOptionBtn;
        const playStatus      = this.state.playStatus;
        return(
            <ul ref={this.controls} className={`controls-ul`}>
                {
                    changeOptionBtn &&
                        <li className="small-btn">
                            <span className={`controls-btn`} onClick={this.handleChange.bind(this,"prev")}>
                                <FaStepBackward />
                            </span>
                        </li>
                }
                <li>
                    <span className={`controls-btn`} onClick={this.props.playStatus.bind(this)}>
                        {
                            playStatus=="play"?(
                                <FaPlay />
                            ):(
                                <FaPause />
                            )
                        }
                    </span>
                </li>
                {
                    changeOptionBtn &&
                        <li className="small-btn">
                            <span className={`controls-btn`} onClick={this.handleChange.bind(this,"next")}>
                                <FaStepForward />
                            </span>
                        </li>
                }
            </ul>
        );
    }
}