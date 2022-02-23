import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../common/Form";

class TimeEntryForm extends Form {
    state = {
        data: { date: "", week: " ", workOrderId: "", hours: "" },
        workOrders: [],
        timeEntries: [],
        errors: {},
    };

    doSubmit = async () => {
        // console.log("doSubmit");
        this.props.onSave(this.state.data);
    };

    handleSelect(workOrderId) {
        var selectedWorkOrder = this.state.workOrders.filter(
            (m) => m._id !== workOrderId
        );
        const selectedDesc = selectedWorkOrder.map((o) => o.desc);
        return !workOrderId ? " " : selectedDesc;
    }

    mapToViewModel(TimeEntry) {
        return {
            _id: TimeEntry._id,
            date: TimeEntry.date,
            workOrderId: TimeEntry.workOrder._id,
            week: TimeEntry.week,
            // workOrderDesc: TimeEntry.workOrder.desc,
            hours: TimeEntry.hours,
        };
    }
    
    render() {

    return (
        <form onSubmit={this.handleSubmit}>
            <div className="row">
                <div className="mr-2">
                    <div className="col-1 m-1">
                        {this.renderInput("week", "Week", "readOnly")}
                    </div>
                </div>
                <div className="col-2">
                    {this.renderInput("date", "Date", Date, "readOnly")}
                </div>
                <div className="col-2">
                    {this.renderSelect(
                        "workOrderId",
                        "WorkOrder",
                        this.state.workOrders
                    )}
                </div>

                <div className="col-3 ">
                    {this.handleSelect(this.state.data.workOrderId)}
                </div>
                <div className="col-1">
                    {this.renderInput("hours", "Hours", Number)}
                </div>
                <div className="col">{this.renderButton("Save")}</div>
                <div className="col">

                </div>
            </div>
        </form>
        )
    }    
} 


export default TimeEntryForm;