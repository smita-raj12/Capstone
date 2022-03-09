import React, { Component } from 'react'
import Table from "../common/Table";
import moment from 'moment';
import { getTimeEntries } from "../services/TimeEntriesService";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectBox from './SelectBox';
import { getWorkOrders } from '../services/WorkOrderService';

class Controlers extends Component {

    state = {
        data: { date: "" },
        errors: {},
        timeEntries:[],
        workOrders: [],
        dateArray: [],
        startDate: "2021-01-01",
        sortColumn: { path: "title", order: "Desc" },
        selectedWorkOrder: null,
        selectedDate: null,
        selectedWeek:null
    };

      columns = [
        { path: "date", label: "Date" },
        { path: "workOrderName", label: "Work Order Number" },
        { path: "workOrderDesc", label: "Work Order Description" },
        { path: "hours", label: "Hours" },
        { path: "week", label: "Week" },
        { path: "userName", label: "userName" }
      ];

      async componentDidMount() {
        const  { data: workOrders }  =  await getWorkOrders();
        const { data } = await getTimeEntries();
       
        const timeEntries = data.map(o=>({
            _id : o._id,
            userName:o.userName,
            week: moment(moment(o.date).format("YYYY-MM-DD")).week(),
            date: moment(o.date).format('YYYY-MM-DD'), 
            workOrderId: o.workOrderId,
            workOrderName : o.name, 
            workOrderDesc: o.description,
            hours: o.hours,
            formType: "data"
        }))
        
        var dateArray = [];

        var currentDate = moment(
            moment(moment(), "YYYY-MM-DD").subtract(90, "days").format("YYYY-MM-DD")
        );

        var startDate = moment(
            moment(moment(), "YYYY-MM-DD").subtract(90, "days").format("YYYY-MM-DD")
        );

        var stopDate = moment(
            moment(moment(), "YYYY-MM-DD").add(30, "days").format("YYYY-MM-DD")
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
        this.setState({timeEntries, workOrders, dateArray, startDate })
    } 

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

    getPageData(){

        const { timeEntries,
                selectedWorkOrder,
                workOrders,
                startDate,
                dateArray,
                selectedDate
            } = this.state
            
            const timeentriesWithinDateRange = timeEntries.filter((m) =>
            moment(m.date).isSameOrAfter(startDate)
        );
        

        dateArray.map((o, id) =>
        timeentriesWithinDateRange.push({
                displayOrder:1,
                date: o.name,
                _id: o.id,
                week: moment(o.name, "YYYY-MM-DD").week(),
                workOrder: 0,
                hours: 0,
        })
        );

        var filtered = timeentriesWithinDateRange;
        let groupByColumn = [];
        let groupByColumnValue = " ";
        let i = 0;           
        groupByColumn[i]="date"

        if (selectedWorkOrder) {
            console.log(filtered)
            filtered = filtered.filter((m) => m.workOrderId === selectedWorkOrder);
            i = i+1
            groupByColumn[i] = "workOrder";
            groupByColumnValue = workOrders
                .filter((o) => o._id === selectedWorkOrder)
                .map((o) => o.name).toString();
        }
        if (selectedDate) {
            filtered = filtered.filter((m) => m.date === selectedDate);
            i = i+1
            groupByColumn[i] = "date";
            groupByColumnValue = groupByColumnValue + ' / ' + selectedDate;
            console.log("groupByColumnValue",groupByColumnValue)
        }
        return {data:filtered}
    } 

    render() {
       
        const  {data}  = this.getPageData();
        console.log(data)
    const { 
        sortColumn,  
        workOrders, 
        selectedWorkOrder,
        selectedDate,
        dateArray} = this.state;
   
    let selectedWorkOrder1 = " ";
    if (selectedWorkOrder){
        selectedWorkOrder1 = selectedWorkOrder;
    }
    const dateId = dateArray
            .filter((o) => o.name === selectedDate)
            .map((o) => o._id);
    return (
        <div style={{backgroundColor: "#eee"}}>
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
        </div>            
        <Table
        columns={this.columns}
        data={data }
        sortColumn={sortColumn}
        onSort={this.handleSort}
        />
        
      </div>
    );
  }
}

export default Controlers;