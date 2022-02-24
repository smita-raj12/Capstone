import React, { Component } from 'react'
import TimeEntryForm from './TimeEntryForm';
import moment
 from 'moment';
class TimeEntries extends Component {

    state = {
        timeEntries: [],
        workOrders: []
    };
    
    handleSave =  (timeEntry) => {
        console.log(timeEntry)
        const timeEntry1 = {...timeEntry, devCode: "DEV00001"}
        console.log(timeEntry1);
        try {
          //const { data: newTimeEntry } = this.setState({timeEntry1: timeEntry})
    
         
            const timeEntries = this.state.timeEntries;
            // console.log("newTimeEntry._id", newTimeEntry._id);
    
            timeEntries.push({
              _id: timeEntry1._id,
              date: timeEntry1.date,
              week: moment(timeEntry1.date, "MM-DD-YYYY").week(),
              workOrder: "w3334 ",
              hours: 5,
            });
    
            console.log("timeEntries ", timeEntries);
            this.setState({ timeEntries: timeEntries });
            timeEntries.map((item, index) => {
                    return <div key={index}>
                        <p>{item.date}</p>
                        <p>{item.week}</p>
                        <p>{item.workOrder}</p>
                        <p>{item.hours}</p>
                    </div>
            })
        } catch (ex) {
          if (ex.response) console.log("ex.repsonse", ex.response);
        }
      };
    
    render() {
        return (
        <div><TimeEntryForm
            onSave={this.handleSave}
        /></div>
        )
    }
}

export default TimeEntries;