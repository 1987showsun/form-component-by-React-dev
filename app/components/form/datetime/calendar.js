import React from 'react';

export default class Calendar extends React.Component{

    constructor(props){

        let _date     = new Date();
        let initYear  = _date.getFullYear();
        let initMonth = String( _date.getMonth()+1 ).length <2 ? `0${_date.getMonth()+1}` : _date.getMonth();
        let initDay   = String(_date.getDate()).length<2       ? `0${_date.getDate()}`    : _date.getDate();

        super(props);
        this.state = {
            today                : `${initYear}-${initMonth}-${initDay}`,
            currentDate          : props.currentDate,
            selectDay            : initDay,
            selectedDate         : `${initYear}-${initMonth}-${initDay}`,
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

        let currentDate     = nextProps.currentDate;
        let currentYear     = Number( currentDate.split('-')[0] );
        let currentMonth    = Number( currentDate.split('-')[1] );

        this.setState({
            currentDate          : nextProps.currentDate,
            prevMonthTotalDay    : new Date( currentYear , currentMonth-1 , 0 ).getDate(),
            currentMonthTotalDay : new Date( currentYear , currentMonth   , 0 ).getDate(),
            nextMonthTotalDay    : new Date( currentYear , currentMonth+1 , 0 ).getDate(),
            currentStartDay      : new Date( currentYear , currentMonth-1 , 1 ).getDay(),
            currentEndDay        : new Date( currentYear , currentMonth   , 1 ).getDay()
        },()=>{
            this.setCalendarView();
        })
    }

    setCalendarView(){
        let currentDate          = this.state.currentDate;
        let currentYear          = Number( currentDate.split('-')[0] );
        let currentMonth         = Number( currentDate.split('-')[1] );
        let prevMonthTotalDay    = this.state.prevMonthTotalDay;
        let currentMonthTotalDay = this.state.currentMonthTotalDay;
        let currentStartDay      = this.state.currentStartDay;
        let currentEndDay        = this.state.currentEndDay;
        let currentMonthArray    = [];

        const renderView = (type,i,ed,classname) => {

            const year  = currentYear;
            const month = String( currentMonth+ed ).length<2 ? `0${currentMonth+ed}` : currentMonth+ed;
            const day   = String( i ).length<2               ? `0${i}`               : i;

            const checkCurrentDate = (date) => {
                const selectedDate = this.state.selectedDate;
                if( selectedDate==date ){
                    return 'active';
                }else{
                    return '';
                }
            }

            return (
                <li key={`${type}${i}`} className={`${classname} ${checkCurrentDate(`${year}-${month}-${day}`)}`} onClick={this.selected.bind(this,`${year}-${month}-${day}`,i)}><span className="touch-block">{i}</span></li>
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

    selected(selectedDate,selectDay){
        this.setState({
            selectDay      : selectDay,
            selectedDate   : selectedDate,
        },()=>{
            this.result();
        });
    }

    result(){
        let selectedDate = `${this.state.selectedDate}`;
        if( this.props.result!=undefined ){
            this.props.result('allDate',selectedDate);
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