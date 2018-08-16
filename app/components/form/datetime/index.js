import React    from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

//Components
import Head     from './head';
import Calendar from './calendar.js';
import Time     from './time';

//Stylesheets
import './datetime.scss';


export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.datetime = React.createRef();
        this.state = {
            required       : props.required,
            type           : props.type,
            name           : props.name,
            placeholder    : props.placeholder,
            [props.name]   : props.value,
            showTime       : props.showTime || false,
            itemWrapStatus : false,
            overflow       : "overflow_false",
            resultDate     : {
                allDate      : "",
                allDatetime  : "",
                date         : "",
                time         : "",
            }
        }
    }

    handleChange(e){
        const name  = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        },()=>{
            if( this.props.result!=undefined ){
                this.props.result( name,value );
            }
        })
    }

    result(type,value){
        const resultDate  = this.state.resultDate;
        const name        = this.state.name;
        resultDate[type]  = value;
        this.setState({
            resultDate   : resultDate,
            [name]       : this.state.showTime? `${resultDate['allDate']} ${resultDate['time']}` : `${resultDate['allDate']}`,
        },()=>{
            if( this.props.result!=undefined ){
                this.props.result( name,this.state[name] );
            }
        })
    }

    itemWrapStatus(status){
        this.setState({
            itemWrapStatus : status=="focus"? true : false
        },()=>{
            let   _overflow             = this.state.overflow;
            const _calendar_wrap_h      = $(this.datetime.current).find('>.calendar-wrap').outerHeight();
            const _coordinate           = $(this.datetime.current).find('>.calendar-wrap').offset().top;
            const _this_h               = $(this.datetime.current).parents().find('>.form-ul').innerHeight();
            const _total_end_coordinate = _coordinate + _calendar_wrap_h;
            if( _total_end_coordinate>_this_h ){
                _overflow = 'overflow_true';
            }else{
                _overflow = 'overflow_false';
            }
            this.setState({
                overflow : _overflow
            });
        })
    }

    checkFormat(){
        let str            = this.state[this.state.name];
        let re;
        if( this.state.showTime ){
            re = new RegExp("^([0-9]{4})[.-]{1}([0-9]{1,2})[.-]{1}([0-9]{1,2})[. ]{1}([0-9]{1,2})[.:]{1}([0-9]{1,2})[.:]{1}([0-9]{1,2})$");
        }else{
            re = new RegExp("^([0-9]{4})[.-]{1}([0-9]{1,2})[.-]{1}([0-9]{1,2})$");
        }
        let strDataValue;
        let infoValidation = true;
        if ((strDataValue  = re.exec(str)) != null) {
          var i;
          i = parseFloat(strDataValue[1]);
          if (i <= 0 || i > 9999) { /*年*/
            infoValidation = false;
          }
          i = parseFloat(strDataValue[2]);
          if (i <= 0 || i > 12) { /*月*/
            infoValidation = false;
          }
          i = parseFloat(strDataValue[3]);
          if (i <= 0 || i > 31) { /*日*/
            infoValidation = false;
          }
        } else {
          infoValidation = false;
        }
        if (!infoValidation) {
          //alert("請輸入 YYYY/MM/DD 日期格式");
        }
        return infoValidation;
    }

    test(){

    }

    render(){
        return(
            <div ref={this.datetime} className={`datetime-time ${this.state.itemWrapStatus} ${this.state.overflow}`} onBlur={this.itemWrapStatus.bind(this,'blur')} onFocus={this.itemWrapStatus.bind(this,'focus')} tabIndex={0}>
                <div className={`input-box ${this.checkFormat()}`}>
                    <input type="text" name={this.state.name} value={ this.state[this.state.name] } onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder} autoComplete="off"/>
                    <span className="datetime-icon">
                        <FaCalendarAlt />
                    </span>
                </div>
                <div className="calendar-wrap">
                    <Head 
                        result     = { this.result.bind(this) } 
                    />
                    <Calendar 
                        currentDate= { this.state.resultDate['date'] } 
                        result     = { this.result.bind(this) }
                    />
                    {
                        this.state.showTime &&
                            <Time
                                result     = { this.result.bind(this) }
                            />
                    }
                </div>
            </div>
        );
    }
}

/*const renderViewSet = ( name ) =>{
    //let setTop = false;
    $('.datetime-time').off().on({
        click : function(){
            let setTop = false;
            const _class = $(this).attr('class').split(' ');
            const _windowStatus = _class.some((item)=>{return item=="true"});
            if( _windowStatus ){
                const _coordinate           = $(this).find('>.calendar-wrap').offset().top;
                const _calendar_wrap_h      = $(this).find('>.calendar-wrap').outerHeight();
                const _total_end_coordinate = _coordinate + _calendar_wrap_h;
                const _this_h               = $(this).parents().find('.form-ul').innerHeight();

                if( _total_end_coordinate>_this_h ){
                    setTop = true;
                }
            }
            return setTop
        }
    })
    return setTop;
}*/
