import React from 'react';
import Joi from 'joi-browser'
import Form from '../common/Form';

class WorkOrderForm extends Form {
    
    state = {
        data : {id: 0, name:'' ,desc:''},
        errors:{}
    }
    schema ={
        _id  : Joi.number(),
        name : Joi.string().required(),
        desc : Joi.string().required()
    }

    doSubmit = async ()=>{
        this.props.onSave(this.state.data);
    }

    customValidation = (input) => {
        
    }

    componentDidMount() {
        const {workOrder} = this.props
        this.setState({ data: this.mapToViewModel(workOrder) });
    }

    mapToViewModel(workOrder) {
       
        return {
            _id: workOrder._id,
            name: workOrder.name,
            desc: workOrder.desc,
            
        };
    }
    
    render() { 
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="mr-2"></div>
                        <div className="col-3 m-1">
                            {this.renderInput("name","Name")}
                        </div>
                        <div className="col-3 m-1">
                            {this.renderInput("desc","Desc",)}
                        </div>
                        <div className="col-3 m-1">
                            {this.renderButton("Save")} 
                        </div>
                        <div className="col-1">
                            <button 
                                onClick={() => this.props.onDelete(this.props.workOrder)} 
                                className="btn-warn btn-sm mt-3">
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div> 
        );
    }
}
 
export default WorkOrderForm;