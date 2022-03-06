import React, { Component } from 'react'
import TimeEntryForm from './TimeEntryForm';
import moment from 'moment';
import {getTimeEntryEmailId,  saveTimeEntry, deleteTimeEntry, getTimeEntryMaxId }  from '../services/TimeEntriesService'
import { toast } from "react-toastify";
import { getWorkOrders} from '../services/WorkOrderService'
import ListGroupHeader from '../common/ListGroupHeader';
import _ from "lodash";
import SelectBox from './SelectBox';

class TimeEntries extends Component {

    state = {
        timeEntries: [],
        workOrders: [],
        dateArray: [],
        weekArray: [],
        startDate: "2021-01-01",
        maxId: 0,
        sortColumn: { path: "title", order: "Desc" },
        selectedWorkOrder: null,
        selectedDate: null,
        selectedWeek:null,
        CurrentEmailId:0
    };
    
    
    
    async componentDidMount() {
        
        const  { data: workOrders }  =  await getWorkOrders();
        const { data } = await getTimeEntryEmailId(this.props.emailId);
        var CurrentEmailId = this.props.emailId;
        // const { data } = await getTimeEntries()
        
        const { data:maxData } = await getTimeEntryMaxId();    
        const maxId = maxData[0]["MAX(_id)"] +1;
        
        
        const timeEntries = data.map(o=>({
            _id : o._id,
            emailId : CurrentEmailId,
            week: moment(moment(o.date).format("YYYY-MM-DD")).week(),
            date: moment(o.date).format("YYYY-MM-DD"),
            workOrderId: o.workOrderId,
            hours: o.hours,
            formType: "data"
        }))

        var dateArray = [];
        var weekArray = [];
        let prevWeekNumber = [];
        let weekNumber = " ";

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
        var y = 0

        while (currentDate <= stopDate) {

            dateArray.push({
                _id: x,
                name: moment(currentDate).format("YYYY-MM-DD"),
            });
            currentDate = moment(currentDate).add(1, "days");
            x = x + 1;
            
            weekNumber = moment(currentDate, "YYYY-MM-DD").week();
     
            if (weekNumber !== prevWeekNumber) {
            weekArray.push({
                _id: y,
                name: weekNumber,
            });
            prevWeekNumber = weekNumber;
            y = y +1;
            //console.log(y)
        }
    }
    this.setState({timeEntries, workOrders,dateArray, maxId, startDate, weekArray,CurrentEmailId})
    }
    
    

    handleSave =  async (timeEntry) => {
        
        try {
            const { data: newTimeEntry } = await saveTimeEntry(timeEntry);
            if (timeEntry._id.startsWith("New")) {
                const timeEntries = this.state.timeEntries;
                timeEntries.push({
                    _id: newTimeEntry._id,
                    date: timeEntry.date,
                    week: moment(timeEntry.date, "YYYY-MM-DD").week(),
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
        const { timeEntries: allTimeEntries,
                startDate,
                selectedWorkOrder,
                selectedDate,
                sortColumn,
                dateArray,
                workOrders,
                selectedWeek,
                maxId,
                CurrentEmailId
            } = this.state

        const timeentriesWithinDateRange = allTimeEntries.filter((m) =>
            moment(m.date).isSameOrAfter(startDate)
        );
        
        // var timeentrieswithDisplayOrder = timeentriesWithinDateRange.map((o) => ({
        //     displayOrder: 2,
        //     week: moment(o.date, "YYYY-MM-DD").week(),
        //     ...o,
        // }));

        dateArray.map((o, id) =>
        timeentriesWithinDateRange.push({
                displayOrder:1,
                date: o.name,
                _id: maxId + id,
                week: moment(o.name, "YYYY-MM-DD").week(),
                workOrder: 0,
                hours: 0,
                formType:"New",
                emailId:CurrentEmailId
            })
        );

        

        var filtered = timeentriesWithinDateRange;
        let groupByColumn = " ";
        let groupByColumnValue = " ";
        
           
        if (selectedWorkOrder) {
            
            filtered = filtered.filter((m) => m.workOrderId === selectedWorkOrder);
            console.log("filtered",filtered)
            if (!selectedDate && !selectedWeek) {
                groupByColumn = "workOrder";
                groupByColumnValue = workOrders
                    .filter((o) => o._id === selectedWorkOrder)
                    .map((o) => o.name);
            }
        }
    
        if (selectedDate) {
            filtered = filtered.filter((m) => m.date === selectedDate);
        
            if (!selectedWorkOrder &&  !selectedWeek) {
                groupByColumn = "date";
                groupByColumnValue = selectedDate;
                console.log("groupByColumnValue",groupByColumnValue)
            }
        }
    
        if (selectedWeek) {
            filtered = filtered.filter((m) => m.week === selectedWeek);
        
            if (!selectedWorkOrder  && !selectedDate) {
                groupByColumn = "week";
                groupByColumnValue = selectedWeek;
            }
        }
    
        if (groupByColumn > " ") {
          _(filtered)
            .groupBy( groupByColumn )
            .map(( groupByColumn ) =>
              filtered.push({
                displayOrder: 1,
                date: " ",
                week: " ",
                formType:"Summary",
                groupByColumn:groupByColumnValue,
                workOrder: " ",
                hours: _.sumBy( groupByColumn , "hours"),
              })
            )
            .value();
        }else {
          _(filtered)
          .groupBy("date")
          .map((date, id) =>
                filtered.push({
                displayOrder: 1,
                date: id,
                formType:"Summary",
                week: moment(id, "YYYY-MM-DD").week(),
                workOrder: "",
                hours: _.sumBy(date, "hours"),
            })
        )
        .value();
        _.groupBy(filtered, "date")
        }

        if(sortColumn.path=== "title"){
            sortColumn.path = "date";
            sortColumn.order= "desc"
        }
            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        return {data: sorted}
    }
    
    columns = [
        {path:"week", label: "Week", width: "1"},
        { path: "date",label: "Date",width: "2"},
        { path: "workOrder.name", label: "Work Order Number", width: "2" },
        { path: "workOrder.description", label: "Work Order Description", width: "3" },
        { path: "hours", label: "Hours", width: 1 },
    ];

    handleSort = (sortColumn) => {
        console.log("sortColumn", sortColumn);
        this.setState({ sortColumn });
    };
    
    handleReset = () => {
        const selectedWorkOrder = null;
        const selectedDate = null;
        const selectedWeek = null;
        this.setState({ selectedWorkOrder, selectedDate, selectedWeek });
    };
    
    handleWorkOrderSelect = (workOrder) => {
        this.setState({
            selectedWorkOrder: parseInt(workOrder),
            
        });
    };

    handleDateSelect = (date) => {
        const { dateArray } = this.state;
        const selectedDate = dateArray[date].name;
        this.setState({ selectedDate });
    };
    
    handleWeekSelect = (week) => {
        const { weekArray } = this.state;
        const selectedWeek = weekArray[week].name;
        this.setState({ selectedWeek});
    };

    render() {
        const { data}  = this.getPageData();
        const {sortColumn,
            workOrders,
            selectedDate,
            selectedWeek,
            selectedWorkOrder,
            dateArray,
            weekArray
        } = this.state
        
        const dateId = dateArray
            .filter((o) => o.name === selectedDate)
            .map((o) => o._id);
        
        const weekId = weekArray
            .filter((o) => o.name === selectedWeek)
            .map((o) => o._id);

        let selectedWorkOrder1 = " ";
        if (selectedWorkOrder){
            selectedWorkOrder1 = selectedWorkOrder;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-1">
                        <button
                            onClick={this.handleReset}
                            className="btn-danger btn-sm mt-3"
                        >
                        Reset
                        </button>
                    </div>
                    <div className="col-2">
                        <SelectBox
                            name="WorkOrderId"
                            options={workOrders}
                            value={selectedWorkOrder1}
                            onChange={this.handleWorkOrderSelect}
                        />
                    </div>
                    <div className="col-2">
                        <SelectBox
                            name="Date"
                            options={dateArray}
                            value={dateId}
                            onChange={this.handleDateSelect}
                        />
                    </div>
                    <div className="col-1">
                        <SelectBox
                            name="Week"
                            options={weekArray}
                            value={weekId}
                            onChange={this.handleWeekSelect}
                        />
                    </div>
                </div>
                <p>Showing time in the database.</p>
                <ListGroupHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={this.handleSort}
                />

                <div> 
                <ul className="list-group">
                {data.map((item) => (
                    <li
                        key={item._id}
                        className="list-inline-item list-group-item-info"
                        >         
                        <TimeEntryForm
                            timeEntry={item}
                            timeEntries={data}
                            onDelete={this.handleDelete}
                            onSave={this.handleSave}
                        />
                        </li>
                        
                ))}
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default TimeEntries;