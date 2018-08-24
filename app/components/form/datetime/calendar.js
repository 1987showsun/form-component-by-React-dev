import React from 'react';

//Javascripts
import { checkDate } from './checkFormat.js';

export default class Calendar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            openListType         : props.openListType,
            year                 : props.year,
            month                : props.month,
            day                  : props.day,
            afterYear            : props.afterYear,
            afterMonth           : props.afterMonth,
            afterDay             : props.afterDay,
            selectedDate         : `${props.afterYear}-${props.afterMonth}-${props.afterDay}`,
            prevMonthTotalDay    : 0,
            currentMonthTotalDay : 0,
            nextMonthTotalDay    : 0,
            currentStartDay      : 0,
            currentEndDay        : 0,
            testView             : []
        }
    }

    componentDidMount() {
        this.result();
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            openListType         : nextProps.openListType,
            year                 : nextProps.year,
            month                : nextProps.month,
            afterDay             : nextProps.afterDay,
            selectedDate         : `${nextProps.afterYear}-${nextProps.afterMonth}-${nextProps.afterDay}`,
            prevMonthTotalDay    : new Date( nextProps.year , nextProps.month-1 , 0 ).getDate(),
            currentMonthTotalDay : new Date( nextProps.year , nextProps.month   , 0 ).getDate(),
            nextMonthTotalDay    : new Date( nextProps.year , nextProps.month+1 , 0 ).getDate(),
            currentStartDay      : new Date( nextProps.year , nextProps.month-1 , 1 ).getDay(),
            currentEndDay        : new Date( nextProps.year , nextProps.month   , 1 ).getDay()
        },()=>{
            this.setCalendarView();
        })
    }

    setCalendarView(){
        let currentYear          = this.state.year;
        let currentMonth         = this.state.month;
        let prevMonthTotalDay    = this.state.prevMonthTotalDay;
        let currentMonthTotalDay = this.state.currentMonthTotalDay;
        let currentStartDay      = this.state.currentStartDay;
        let currentEndDay        = this.state.currentEndDay;
        let currentMonthArray    = [];

        const renderView = (type,i,ed,classname) => {
            const year  = checkDate( 'year' , Number(currentYear) );
            const month = checkDate( 'month', Number(currentMonth)-ed );
            const day   = checkDate( 'day'  , i );
            const checkCurrentDate = (date) => {
                const selectedDate = this.state.selectedDate;
                if( selectedDate==date ){
                    return 'active';
                }else{
                    return '';
                }
            }

            return (
                <li key={`${type}${i}`} className={`${classname} ${checkCurrentDate(`${year}-${month}-${day}`)}`} onClick={this.selected.bind(this,`${year}-${month}-${day}`,year,month,day)}><span className="touch-block">{i}</span></li>
            );
        }

        for( let i = prevMonthTotalDay-(currentStartDay-1) ; i <= prevMonthTotalDay ; i++ ){
            currentMonthArray.push( renderView('prev',i,-1,'pointerEventsNone') );
        }

        for( let i = 1 ; i<=currentMonthTotalDay ; i++ ){
            currentMonthArray.push( renderView('current',i,0,'') );
        }

        for( let i = 1 ; i<=(7-currentEndDay) ; i++ ){
            currentMonthArray.push( renderView('next',i,+1,'pointerEventsNone') );
        }

        this.setState({
            testView : currentMonthArray
        });
    }

    selected(selectedDate,year,month,day){
        this.setState({
            afterYear      : year,
            afterMonth     : month,
            afterDay       : day,
            selectedDate   : selectedDate,
        },()=>{
            this.result();
        });
    }

    result(){
        let sss          = ['afterYear','afterMonth','afterDay'];
        for( let i=0 ; i<sss.length ; i++ ){
            if( this.props.result!=undefined ){
                this.props.result(sss[i], this.state[sss[i]] );
            }
        }
    }

    render(){
        return(
            <div className="calendar-main">
                <div className="calendar-main-head">
                    <ul>
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                </div>
                <div className="calendar-main-con">
                    <ul>
                        { this.state.testView }
                    </ul>
                </div>
            </div>
        );        
    }
}