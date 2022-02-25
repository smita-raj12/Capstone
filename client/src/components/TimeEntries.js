import React, { Component } from 'react'
import TimeEntryForm from './TimeEntryForm';
import moment from 'moment';
import { getTimeEntryList, saveTimeEntry, deleteTimeEntry } from './FakeTimeEntries';
import { getWorkOrders} from './FakeWorkOrders';

class TimeEntries extends Component {

    state = {
        timeEntries: [],
        workOrders: [],
        dateArray: [],
        weekArray: [],
        startDate: "2021-01-01"
        
    };
    

    componentDidMount() {
        const  workOrders  =  getWorkOrders();
        const  timeEntries  = getTimeEntryList();

        var dateArray = [];
        var weekArray = [];
        let prevWeekNumber = [];
        let weekNumber = " ";

        var currentDate = moment(
            moment(moment(), "MM-DD-YYYY").subtract(10, "days").format("MM/DD/YYYY")
        );

        var startDate = moment(
            moment(moment(), "MM-DD-YYYY").subtract(10, "days").format("MM/DD/YYYY")
        );

        var stopDate = moment(
            moment(moment(), "MM-DD-YYYY").add(10, "days").format("MM/DD/YYYY")
        );

        var x = 0;
        let y = 0;

        while (currentDate <= stopDate) {
            dateArray.push({
                _id: x,
                name: moment(currentDate).format("MM/DD/YYYY"),
            });
            currentDate = moment(currentDate).add(1, "days");
            x = x + 1;
            weekNumber = moment(currentDate, "MM-DD-YYYY").week();

            if (weekNumber !== prevWeekNumber) {
                weekArray.push({
                    _id: y,
                    name: weekNumber,
                });
                prevWeekNumber = weekNumber;
                y = y +1;
            }
        }
        this.setState({ timeEntries, workOrders, dateArray, weekArray, startDate });
    }
    
    

    handleSave =  (timeEntry) => {
        
        const timeEntry1 = {...timeEntry}
        let newTimeEntry= saveTimeEntry(timeEntry1);

        const timeEntries = this.state.timeEntries;

        
        timeEntries.push({
            _id: newTimeEntry._id,
            date: timeEntry.date,
            week: moment(timeEntry.date, "MM-DD-YYYY").week(),
            workOrder: timeEntry.workOrderId,
            hours: 5,
        });
    
            console.log("timeEntries ", timeEntries);
            this.setState({ timeEntries });
    };
    
    handleDelete = (timeEntry) => {
        const origionaltimeEntries = this.state.timeEntries;
       
        const timeEntries = origionaltimeEntries.filter(
            (m) => m._id !== timeEntry._id
        );
        console.log(origionaltimeEntries,timeEntry)
        this.setState({ timeEntries });
        deleteTimeEntry(timeEntry._id);
        this.setState({ timeEntries });
        
    };

    render() {

        const {timeEntries} = this.state

        return (
            <div>
                <div> {timeEntries.map((item) => {
                        return <div  key={item._id}>
                                    
                        <TimeEntryForm
                            timeEntry={item}
                            timeEntries={timeEntries}
                            onDelete={this.handleDelete}
                            onSave={this.handleSave}
                        />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default TimeEntries;