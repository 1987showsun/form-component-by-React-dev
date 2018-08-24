import React from 'react';
import { FaAngleLeft,FaAngleRight }  from 'react-icons/fa';

//Components
import Head from './head';

export default class YearMonthList extends React.Component{

    constructor(props){
        super(props);
        const showMax = 12;
        this.state = {
            type         : props.type,
            year         : props.year,
            month        : props.month,
            afterYear    : props.afterYear,
            afterMonth   : props.afterMonth,
            showMax      : showMax,
            initShowYear : (Number(props.year)-(showMax/2)),
            maxShowYear  : (Number(props.year)-(showMax/2))+showMax
        }
    }

    componentWillReceiveProps(nextProps) {
        const showMax = this.state.showMax;
        this.setState({
            type         : nextProps.type,
            year         : nextProps.year,
            month        : nextProps.month,
            afterYear    : nextProps.afterYear,
            afterMonth   : nextProps.afterMonth,
            initShowYear : (Number(nextProps.year)-(showMax/2)),
            maxShowYear  : (Number(nextProps.year)-(showMax/2))+showMax
        })
    }

    changeYear( actionType ){
        let showMax         = 0;
        let initShowYear    = this.state.initShowYear;
        let maxShowYear     = this.state.maxShowYear;
        if( actionType=='prev' ){
            showMax       = this.state.showMax;
        }else{
            showMax       = -this.state.showMax;
        }

        this.setState({
            initShowYear : initShowYear - showMax,
            maxShowYear  : maxShowYear  - showMax
        });
    }

    selected( val ){
        this.props.resultList(this.state.type,val);
    }

    renderYear(){
        let renderArray = [];
        if( this.state.type=='year' ){
            const initShowYear = this.state.initShowYear;
            const maxShowYear  = this.state.maxShowYear;
            const year         = Number(this.state.year);
            for( let i=initShowYear ; i<maxShowYear ; i++ ){
                renderArray.push(<li key={i} className={`${ i==year? "active":"" }`} onClick={this.selected.bind(this,i)}>{i}</li>);
            }
        }else{
            let monthText      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let month          = Number(this.state.month);
            for( let i=1 ; i<=this.state.showMax ; i++ ){
                renderArray.push(<li key={i} className={`${ i==month? "active":"" }`} onClick={this.selected.bind(this,i)}>{ monthText[i-1] }</li>);
            }
        }
        return renderArray;
    }

    render(){
        return(
            <div className="calendar-wrap">
                <Head 
                    type = { this.state.type }
                    back = { this.props.back }
                />
                <div className="year-month-wrap">
                    {
                        this.state.type=='year' &&
                            <div className="openListType-btn" onClick={ this.changeYear.bind(this,"prev") }>
                                <FaAngleLeft />
                            </div>
                    }
                    <ul className="openListType-ul">
                        { this.renderYear() }
                    </ul>
                    {
                        this.state.type=='year' &&
                            <div className="openListType-btn" onClick={ this.changeYear.bind(this,"next") }>
                                <FaAngleRight />
                            </div>
                    }
                </div>
            </div>
        );
    }
}