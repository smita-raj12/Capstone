import React from 'react'
import Form from '../common/Form';
import "bootstrap/dist/css/bootstrap.min.css";
//import { workOrders } from './FakeWorkOrders';
import  Joi  from 'joi-browser';

class WorkOrderForm extends Form {
    
    state = {
        workOrder: [],
        data: {name: " ", desc:" "}
    };

    schema = {
        _id: Joi.number(),
        name: Joi.string().max(10).required(),
        desc: Joi.string().max(80).required()
    };

    populateWorkOrder() {
        const { workOrder } = this.props;
        console.log(workOrder)
        this.setState({ data: this.mapToViewModel(workOrder) });
    }

    componentDidMount() {
        console.log("test")
        this.populateWorkOrder();
        console.log(this.state.data);
    }

    mapToViewModel(workOrder) {
       
        return {
            _id: workOrder._id,
            name: workOrder.name,
            desc: workOrder.desc
        };
    }
    
   

    doSubmit = async () => {
        
        //this.props.onSave(this.state.data);
    };

    customValidation = (input) => {
        console.log(input)
    }

    render() {
        console.log("test2")
        const { workOrder } = this.props;
        console.log(workOrder)
        this.setState({ data: this.mapToViewModel(workOrder) });
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="mr-2"></div>

                <div className="col-1 m-1">
                    {this.renderInput("name", "Name")}
                </div>

                <div className="col-2">
                    {this.renderInput("desc", "Desc")}
                </div>

                <div className="col">{this.renderButton("Save")}</div>
                
                <div className="col">
                <button 
                    onClick={() => this.props.onDelete(this.props.workOrder)} 
                    className="btn-warn btn-sm mt-3">
                    Delete
                </button>
                </div>
            </div>
        </form>
        )
    }
}

export default WorkOrderForm;