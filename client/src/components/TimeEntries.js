import React, { Component } from 'react'
import TimeEntryForm from './TimeEntryForm';
import moment from 'moment';
import { getTimeEntryList } from './FakeTimeEntries';
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

        // console.log("timeEntries",timeEntries)
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
        //console.log(weekArray)
        this.setState({ timeEntries, workOrders, dateArray, weekArray, startDate });
    }
    
    

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

        return (
            <div>
            <div> {timeEntries.map((item) => {
                                return <div  key={item._id}>
                                
                                <TimeEntryForm
                                    timeEntry={item}
                                    timeEntries={timeEntries}
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