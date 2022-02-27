import React from 'react';
import Joi from 'joi-browser'
import Form from '../common/Form';

class WorkOrderForm extends Form {
    
    state = {
        data :{name:'' ,desc:''},
        errors:{}
    }
    schema ={
        name : Joi.string().required().label("name"),
        desc : Joi.string().required().label("desc")
    }

    doSubmit=async ()=>{
    
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
            </div>
            </form>
        </div> );
    }
}
 
export default WorkOrderForm;