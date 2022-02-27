import React from "react";
import Joi from "joi-browser";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../common/Form";
import moment from "moment";
import { getWorkOrders } from "../services/WorkOrderService";


class TimeEntryForm extends Form {
    state = {
        data: { date: "",  workOrderId: " ", week: " ", hours: "", formType:" " },
        workOrders: [],
        timeEntries: [],
        errors: {},
    };
    
    schema = {
        _id: Joi.number(),
        date: Joi.date()
            .max(moment().add(3, "months").format("YYYY-MM-DD"))
            .min(moment().subtract(3, "months").format("YYYY-MM-DD"))
            .required()
            .label("Date"),
        week: Joi.number(),
        workOrderId: Joi.number().label("WorkOrderId").required(),
        hours: Joi.number().max(24).required(),
        formType: Joi.string().max(24).required()
    };

    async populateWorkOrder() {
        const { data }  =  await getWorkOrders();
        let workOrders = [];
        
        data.map((o) =>
            workOrders.push({
                _id: o._id,
                name: o.name,
                desc: o.desc,
            })
        );
       
        this.setState({ workOrders });
    }
    
    populateTimeEntry() {
        const { timeEntry } = this.props;
        this.setState({ data: this.mapToViewModel(timeEntry) });
    }
    
    populateTimeEntries() {
        const { timeEntries } = this.props;
        this.setState({ timeEntries });
    }
    
    componentDidMount() {

        console.log("test")
        this.populateWorkOrder();
        this.populateTimeEntry();
        this.populateTimeEntries();
    }
    
    doSubmit = async () => {
        
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
            workOrderId: TimeEntry.workOrderId,
            week: TimeEntry.week,
            hours: TimeEntry.hours,
            formType: TimeEntry.formType
        };
    }
    
    customValidation = (input) => {
        console.log(input)
        // const { date } = this.state.data;
    
        // var customError = " ";
        // var totalHoursperday = 0;

        // this.populateTimeEntries();
        // const origionaltimeEntries = this.state.timeEntries;
       
        // const timeEntriesforthedate = origionaltimeEntries.filter(
        //     (m) => m.date === date
        // );
    
        // if (input.name === "hours") {
        //     totalHoursperday = input.value;
        // }
    
        // for (let i = 0; i < timeEntriesforthedate.length; i++) {
        //     if (input.name === "workOrderId") {
        //         if (
        //             timeEntriesforthedate[i].date === date &&
        //             timeEntriesforthedate[i].workOrder._id === input.value
        //         ) {
        //             return (customError = "Duplicate work order ");
        //         }
        //     }
    
        //     if (input.name === "hours") {
        //         totalHoursperday =
        //             parseInt(totalHoursperday) + timeEntriesforthedate[i].hours;
        //         if (totalHoursperday > 24) {
        //             return (customError = "Total hours per day can't be more than 24 ");
        //         }
        //     }
        // }
    
        // return customError > " " ? customError : null;
    };
    
    
    
    render() {

    return (
        <form onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="mr-2"></div>

                <div className="col-1 m-1">
                    {this.renderInput("week", "Week")}
                </div>

                <div className="col-2">
                    {this.renderInput("date", "Date", Date)}
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


export default TimeEntryForm;