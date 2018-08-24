import React    from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

//Components
import Head              from './head';
import Calendar          from './calendar.js';
import YearMonthList     from './year_month';
import Time              from './time';

//Javascripts
import { checkFormat,checkDate } from './checkFormat.js';

//Stylesheets
import './datetime.scss';


export default class Index extends React.Component{
    constructor(props){
        super(props);

        let _date     = new Date();
        let initYear  = checkDate( 'year' , _date.getFullYear() );
        let initMonth = checkDate( 'month', _date.getMonth()+1  );
        let initDay   = checkDate( 'day'  , _date.getDate()     );
        let initHrs   = checkDate( 'hrs'  , _date.getHours()    );
        let initMin   = checkDate( 'min'  , _date.getMinutes()  );
        let initSec   = checkDate( 'sec'  , _date.getSeconds()  );

        this.datetime = React.createRef();
        this.state = {
            openListType   : "day",
            required       : props.required,
            type           : props.type,
            name           : props.name,
            placeholder    : props.placeholder,
            [props.name]   : props.value,
            showTime       : props.showTime || false,
            itemWrapStatus : false,
            overflow       : "overflow_false",
            resultDate     : {
                year         : initYear,
                month        : initMonth,
                day          : initDay,
                hrs          : initHrs,
                min          : initMin,
                sec          : initSec,
                afterYear    : initYear,
                afterMonth   : initMonth,
                afterDay     : initDay,
                afterHrs     : initHrs,
                afterMin     : initMin,
                afterSec     : initSec
            }
        }
    }

    handleChange(e){
        const name            = e.target.name;
        const value           = e.target.value;
        const showTime        = this.state.showTime;
        const resultDate      = this.state.resultDate;
        let   combinationDate = "";

        resultDate['year']          = value.split('-')[0];
        resultDate['month']         = value.split('-')[1];
        resultDate['afterYear']     = value.split('-')[0];
        resultDate['afterMonth']    = value.split('-')[1];
        resultDate['afterDay']      = value.split('-')[2].split(' ')[0];
        combinationDate = `${resultDate['year']}-${resultDate['month']}-${resultDate['afterDay']}`;

        if( showTime ){
            if( value.split(' ').length>1 ){
                let time = value.split(' ')[1];
                resultDate['hrs'] = time.split(':')[0];
                resultDate['min'] = time.split(':')[1];
                resultDate['sec'] = time.split(':')[2];
                combinationDate = combinationDate+` ${resultDate['hrs']}:${resultDate['min']}:${resultDate['sec']}`;
            }
        }        
        this.setState({
            [name]     : combinationDate,
            resultDate : resultDate
        })
    }

    result(type,value){
        const checkArray      = ['year','month','day','afterYear','afterMonth','afterDay','hrs','min','sec'];
        const name            = this.state.name;
        const resultDate      = this.state.resultDate;
        const showTime        = this.state.showTime;
        let   combinationDate = "";
        let   loopLength      = showTime==true? checkArray.length : 6;

        resultDate[type]      = value;
        if( showTime ){
            combinationDate = `${resultDate['afterYear']}-${resultDate['afterMonth']}-${resultDate['afterDay']} ${resultDate['hrs']}:${resultDate['min']}:${resultDate['sec']}`;
        }else{
            combinationDate = `${resultDate['afterYear']}-${resultDate['afterMonth']}-${resultDate['afterDay']}`;
        }

        this.setState({
            resultDate   : resultDate,
            [name]       : combinationDate,
        },()=>{
            if( this.props.result!=undefined ){
                this.props.result( name,this.state[name] );
            }
        })
    }

    resultList( key,val ){
        const resultDate      = this.state.resultDate;
        resultDate[key]       = checkDate(key,val);
        this.setState({
            openListType : 'day',
            resultDate   : resultDate
        })
    }

    back(){
        this.setState({
            openListType : 'day'
        })
    }

    itemWrapStatus(status){
        const checkArray      = ['year','month','day','afterYear','afterMonth','afterDay','hrs','min','sec'];
        const name            = this.state.name;
        const resultDate      = this.state.resultDate;
        const showTime        = this.state.showTime;
        let   combinationDate = "";
        let   loopLength      = showTime==true? checkArray.length : 6;

        for( let i=0 ; i<loopLength ; i++ ){
            resultDate[ checkArray[i] ] = checkDate( checkArray[i] ,resultDate[ checkArray[i] ] );
        }
        combinationDate  = `${resultDate['afterYear']}-${resultDate['afterMonth']}-${resultDate['afterDay']}`;
        
        if( showTime ){
            combinationDate = combinationDate + ` ${resultDate['hrs']}:${resultDate['min']}:${resultDate['sec']}`;
        }

        this.setState({
            openListType   : status!="focus"? "day": this.state.openListType,
            itemWrapStatus : status=="focus"? true : false,
            resultDate     : resultDate,
            [name]         : combinationDate
        },()=>{
            let _calendar_wrap_h      = $(this.datetime.current).find('>.calendar-wrap').outerHeight();
            let _coordinate           = $(this.datetime.current).find('>.calendar-wrap').offset().top;
            let _this_h               = $(this.datetime.current).parents().find('>.form-ul').innerHeight();
            let _total_end_coordinate = _coordinate + _calendar_wrap_h;
            let _overflow             = (_total_end_coordinate>_this_h)? 'overflow_true' : 'overflow_false';
            this.setState({
                overflow : _overflow
            });

            if( this.props.result!=undefined ){
                this.props.result( name,combinationDate );
            }
        })
    }

    openList(type){
        this.setState({
            openListType : type
        })
    }

    render(){
        const val       = this.state[this.state.name];
        const showTime  = this.state.showTime;
        return(
            <div ref={this.datetime} className={`datetime-time ${this.state.itemWrapStatus} ${this.state.overflow}`} onBlur={this.itemWrapStatus.bind(this,'blur')} onFocus={this.itemWrapStatus.bind(this,'focus')} tabIndex={0}>
                <div className={`input-box ${checkFormat(val,showTime)}`}>
                    <input type="text" name={this.state.name} value={ val } onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder} autoComplete="off"/>
                    <span className="datetime-icon">
                        <FaCalendarAlt />
                    </span>
                </div>
                {
                    this.state.openListType == 'day'? (
                        <div className="calendar-wrap">
                            <Head
                                year         = { this.state.resultDate['year']      }
                                month        = { this.state.resultDate['month']     }
                                result       = { this.result.bind(this)             }
                                openList     = { this.openList.bind(this)           }
                            />
                            <Calendar
                                year         = { this.state.resultDate['year']      }
                                month        = { this.state.resultDate['month']     }
                                day          = { this.state.resultDate['day']       }
                                afterYear    = { this.state.resultDate['afterYear'] }
                                afterMonth   = { this.state.resultDate['afterMonth']}
                                afterDay     = { this.state.resultDate['afterDay']  }
                                openListType = { this.state.openListType            }
                                result       = { this.result.bind(this)             }
                            />
                            <Time
                                hrs          = { this.state.resultDate['hrs']       }
                                min          = { this.state.resultDate['min']       }
                                sec          = { this.state.resultDate['sec']       }
                                afterHrs     = { this.state.resultDate['afterHrs']  }
                                afterMin     = { this.state.resultDate['afterMin']  }
                                afterSec     = { this.state.resultDate['afterSec']  }
                                showTime     = { this.state.showTime                }
                                result       = { this.result.bind(this)             }
                            />
                        </div>
                    ):(
                        <YearMonthList 
                            type             = { this.state.openListType            }
                            year             = { this.state.resultDate['year']      }
                            month            = { this.state.resultDate['month']     }
                            day              = { this.state.resultDate['day']       }
                            afterYear        = { this.state.resultDate['afterYear'] }
                            afterMonth       = { this.state.resultDate['afterMonth']}
                            afterDay         = { this.state.resultDate['afterDay']  }
                            resultList       = { this.resultList.bind(this)         }
                            back             = { this.back.bind(this)               }
                        />
                    )
                }
            </div>
        );
    }
}