import React from "react";
import Joi from "joi-browser";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../common/Form";
import moment from "moment";
import { getWorkOrders } from "../services/WorkOrderService";


class TimeEntryForm extends Form {
    state = {
        data: { date: moment(moment(), "YYYY-MM-DD").subtract(3, "months").format("YYYY-MM-DD"),
        workOrderId: 0, week: 0, hours: 0, emailId: 0,formType:" " },
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
        workOrderId: Joi.number().label("WorkOrderId"),
        emailId: Joi.number().label("emailId"),
        hours: Joi.number().min(1).max(24),
        formType: Joi.string().max(24).required()
    };

    async populateWorkOrder() {
        const { data }  =  await getWorkOrders();
        let workOrders = [];
        
        data.map((o) =>
            workOrders.push({
                _id: o._id,
                name: o.name,
                description: o.description,
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
        const selecteddescription = selectedWorkOrder.map((o) => o.description);
        return !workOrderId ? " " : selecteddescription;
    }

    mapToViewModel(TimeEntry) {
        return {
            _id: TimeEntry._id,
            date: TimeEntry.date,
            workOrderId: TimeEntry.workOrderId,
            emailId: TimeEntry.emailId,
            week: TimeEntry.week,
            hours: TimeEntry.hours,
            formType: TimeEntry.formType
        };
    }
    
    customValidation = (input) => {
        
        const { date } = this.state.data;
    
        var customError = " ";
        var totalHoursperday = 0;

        this.populateTimeEntries();
        const origionaltimeEntries = this.state.timeEntries;
       
        const timeEntriesforthedate = origionaltimeEntries.filter(
            (m) => m.date === date
        );
    
        if (input.name === "hours") {
            totalHoursperday = input.value;
        }
    
        for (let i = 0; i < timeEntriesforthedate.length; i++) {
            if (input.name === "workOrderId") {
                if (
                    timeEntriesforthedate[i].date === date &&
                    timeEntriesforthedate[i].workOrder._id === input.value
                ) {
                    return (customError = "Duplicate work order ");
                }
            }
    
            if (input.name === "hours") {
                totalHoursperday =
                    parseInt(totalHoursperday) + timeEntriesforthedate[i].hours;
                if (totalHoursperday > 24) {
                    return (customError = "Total hours per day can't be more than 24 ");
                }
            }
        }
    
        return customError > " " ? customError : null;
    };
    
    
    render() {
        const { timeEntry } = this.props;

        return (
            <div>
                {timeEntry.formType.startsWith("Summary") && (
                    <div className="row bg-info m-2">
                        <div className="col">{timeEntry.groupByColumn}</div>
                        <div className="col">======Total=============</div>
                        <div className="col">{timeEntry.hours}</div>
                    </div>
                )}

                {!timeEntry.formType.startsWith("Summary") && (  
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

                        <div className="col-3">
                            {this.handleSelect(this.state.data.workOrderId)}
                        </div>

                        <div className="col-1">
                            {this.renderInput("hours", "Hours", Number)}
                        </div>

                        <div className="col-1">{this.renderButton("Save")}</div>
                        
                        <div className="col-1">
                        <button 
                            onClick={() => this.props.onDelete(this.props.timeEntry)} 
                            className="btn-warn btn-sm mt-3">
                            Delete
                        </button>
                        </div>
                    </div>
                </form>
                )}   
            </div>
        );
    }    
} 


export default TimeEntryForm;