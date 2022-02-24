import React, { Component } from 'react'
import TimeEntryForm from './TimeEntryForm';
import moment from 'moment';
class TimeEntries extends Component {

    state = {
        timeEntries: [],
        workOrders: []
    };
    
    handleSave =  (timeEntry) => {

            const timeEntries = this.state.timeEntries;

            let newId = timeEntry.date + timeEntry.workOrderId
            timeEntries.push({
                _id: newId,
                date: timeEntry.date,
                week: moment(timeEntry.date, "MM-DD-YYYY").week(),
                workOrder: " ",
                hours: 5,
            });
    
            console.log("timeEntries ", timeEntries);
            this.setState({ timeEntries });
    };
    
    render() {
        const {timeEntries} = this.state
        console.log(timeEntries);
        return (
            <div>
        <div>
        <TimeEntryForm
            onSave={this.handleSave}
        /></div>
        <div> {timeEntries.map((item, index) => {
                    return <div key={index}>
                        <p>{item.date}</p>
                        <p>{item.week}</p>
                        <p>{item.workOrder}</p>
                        <p>{item.hours}</p>
                    </div>
            })}</div>
            </div>
        )
    }
}

export default TimeEntries;