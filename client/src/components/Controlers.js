import React, { Component } from 'react'
import Table from "../common/Table";
import moment from 'moment';
import { getTimeEntries } from "../services/TimeEntriesService";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectBox from './SelectBox';
import { getWorkOrders } from '../services/WorkOrderService';

export default class Controlers extends Component {
    state = {
        data: { date: "" },
        errors: {},
        timeEntries:[],
        workOrders: [],
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
        
        this.setState({timeEntries, workOrders })
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

    render() {
    const { timeEntries , sortColumn, workOrders, selectedWorkOrder} = this.state;
   
    let selectedWorkOrder1 = " ";
    if (selectedWorkOrder){
        selectedWorkOrder1 = selectedWorkOrder;
    }

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
        </div>            
          <Table
          columns={this.columns}
          data={timeEntries }
          sortColumn={sortColumn}
          onSort={this.handleSort}
         
        />
        
      </div>
    );
  }
}

