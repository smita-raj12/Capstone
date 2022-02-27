import React from 'react'
import Form from '../common/Form';
import "bootstrap/dist/css/bootstrap.min.css";

class WorkOrderForm extends Form {

    state = {
        workOrders: []
    }

    mapToViewModel(workOrder) {
       
        return {
            _id: workOrder._id,
            name: workOrder.name,
            desc: workOrder.desc
        };
    }
    render() {
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
                    onClick={() => this.props.onDelete(this.props.timeEntry)} 
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