import React            from 'react';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import { FaCheck,FaCheckCircle }      from 'react-icons/fa';

export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name            : props.name,
            initVal         : props.initVal,
            optionData      : props.optionData
        }
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name            : nextProps.name,
            initVal         : nextProps.initVal,
            optionData      : nextProps.optionData
        })
    }

    selected( selectedItem ){
        let initVal   = Object.assign([],this.state.initVal);
        let addStatus = initVal.some(item=>{
            return item['id'] == selectedItem['id'];
        })
        if( !addStatus ){
            initVal = [ ...initVal , {'id' : selectedItem['id'], 'value' : selectedItem['value']} ];
        }else{
            initVal.map((item,i)=>{
                if( item['id']==selectedItem['id'] ){
                    return initVal.splice(i,1);
                }
            })
        }
        this.setState({
            initVal
        },()=>{
            this.props.selectOption( initVal );
        })
    }

    checkout( item ){
        let initVal     = this.state.initVal;
        let selected    = initVal.some((initValItem)=>{
            return initValItem['id'] == item['id'];
        })
        
        return selected==true? 'checked' : '';
    }

    render(){
        return(
            <div className="multiple-select">
                <PerfectScrollbar>
                    {
                        this.state.optionData.length != 0 ? (
                            this.state.optionData.map((item,i)=>{
                                return(
                                    <div key={i} className={`multiple-select-option ${this.checkout(item)}`} onClick={this.selected.bind(this, item )}>
                                        {item['value']}
                                        <FaCheckCircle />
                                    </div>
                                );
                            })
                        ):(
                            <div className="multiple-select-option noOption">No Option</div>
                        )
                    }
                </PerfectScrollbar>
            </div>
        );
    }
}