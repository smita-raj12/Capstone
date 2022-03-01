import React, { Component } from 'react'
import TimeEntryForm from './TimeEntryForm';
import moment from 'moment';
import {getTimeEntries,  saveTimeEntry, deleteTimeEntry, getTimeEntryMaxId }  from '../services/TimeEntriesService'
import { toast } from "react-toastify";
import { getWorkOrders} from '../services/WorkOrderService'


class TimeEntries extends Component {

    state = {
        timeEntries: [],
        workOrders: [],
        dateArray: [],
        weekArray: [],
        startDate: "2021-01-01",
        maxId: 0
    };
    
    
    
    async componentDidMount() {
        const  { data: workOrders }  =  await getWorkOrders();
        const { data } = await getTimeEntries();
        const { data:maxData } = await getTimeEntryMaxId();
        
        const maxId = maxData[0]["MAX(_id)"] +1;
        
        const timeEntries = data.map(o=>({
            _id : o._id,
            week: moment(moment(o.date).format("YYYY-MM-DD")).week(),
            date: moment(o.date).format("YYYY-MM-DD"),
            workOrderId: o.workOrderId,
            hours: o.hours,
            formType: "data"
        }))
       
        
        var dateArray = [];
       
        var currentDate = moment(
            moment(moment(), "YYYY-MM-DD").subtract(10, "days").format("YYYY-MM-DD")
        );

        var startDate = moment(
            moment(moment(), "YYYY-MM-DD").subtract(10, "days").format("YYYY-MM-DD")
        );

        var stopDate = moment(
            moment(moment(), "YYYY-MM-DD").add(10, "days").format("YYYY-MM-DD")
        );

        var x = 0

        while (currentDate <= stopDate) {

            dateArray.push({
                _id: x,
                name: moment(currentDate).format("YYYY-MM-DD"),
            });
            currentDate = moment(currentDate).add(1, "days");
            x = x + 1;
            
        }
        
        this.setState({timeEntries, workOrders,dateArray, maxId, startDate})
    }
    
    

    handleSave =  async (timeEntry) => {
        
        try {
            const { data: newTimeEntry } = await saveTimeEntry(timeEntry);
      
            if (timeEntry._id.startsWith("new")) {
                const timeEntries = this.state.timeEntries;
             
      
              timeEntries.push({
                _id: newTimeEntry._id,
                date: timeEntry.date,
                week: moment(timeEntry.date, "MM-DD-YYYY").week(),
                workOrder: " ",
                hours: " ",
              });
      
              
              this.setState({ timeEntries });
            }
          } catch (ex) {
            if (ex.response) console.log("ex.repsonse", ex.response);
          }
    };
    
    handleDelete = async (timeEntry) => {
        const origionaltimeEntries = this.state.timeEntries;
        const timeEntries = origionaltimeEntries.filter(
            (m) => m._id !== timeEntry._id
        );
        this.setState({ timeEntries });
    
        try {
            
            await deleteTimeEntry(timeEntry._id);
        } catch (ex) {
            console.log("HANDLE DELETE CATCH BLOCK");
            if (ex.response && ex.response.status === 404)
                toast.error("This post has already been deleted");
            this.setState({ timeEntries: origionaltimeEntries });
        }
    };

    getPageData(){
        const { timeEntries: allTimeEntries, dateArray, startDate, maxId} = this.state
        const timeentriesWithinDateRange = allTimeEntries.filter((m) =>
            moment(m.date).isSameOrAfter(startDate)
        );
        
        dateArray.map((o, id) =>
            timeentriesWithinDateRange.push({
                date: o.name,
                _id: maxId + id,
                week: moment(o.name, "YYYY-MM-DD").week(),
                workOrder: 0,
                hours: 0,
                formType:"New"
            })
        );
        return {data: timeentriesWithinDateRange}
    }
    
    
    render() {
        const { data}  = this.getPageData();
        return (
            <div>
                <div> {data.map((item) => {
                        return <div  key={item._id}
                        className="list-inline-item list-group-item-info">            
                        <TimeEntryForm
                            timeEntry={item}
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