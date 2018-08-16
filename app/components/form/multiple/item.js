import React            from 'react';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import { FaCheck,FaCheckCircle }      from 'react-icons/fa';

export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            initVal         : props.initVal,
            optionData      : props.optionData
        }
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            initVal         : nextProps.initVal,
            optionData      : nextProps.optionData
        })
    }

    selected( selectedItem ){
        let initVal   = Object.assign([],this.state.initVal);
        let addStatus = initVal.some(item=>{
            return item['value'] == selectedItem['value'];
        })
        if( !addStatus ){
            initVal = [ ...initVal , {'value' : selectedItem['value'], 'name' : selectedItem['name']} ];
        }else{
            initVal.map((item,i)=>{
                if( item['value']==selectedItem['value'] ){
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
            return initValItem['value'] == item['value'];
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
                                        {item['name']}
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