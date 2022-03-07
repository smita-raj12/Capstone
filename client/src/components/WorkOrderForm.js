import React from 'react';
import Joi from 'joi-browser'
import Form from '../common/Form';

class WorkOrderForm extends Form {
    
    state = {
        data : {_id: 0, name:'' ,description:''},
        errors:{}
    }
    schema ={
        _id  : Joi.number(),
        name : Joi.string().required(),
        description : Joi.string().required(),
        
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
            description: workOrder.description,
            
        };
    }
    
    render() { 
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="mr-2"></div>
                        <div className="col-2 m-1">
                            {this.renderInput("_id","ID","text" ,"readOnly")}
                        </div>
                        <div className="col-2 m-1">
                            {this.renderInput("name","Name")}
                        </div>
                        <div className="col-3 m-1">
                            {this.renderInput("description","description",)}
                        </div>
                        <div className="col-2 m-1">
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