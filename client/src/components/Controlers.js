import React, { Component } from 'react'
import Table from "../common/Table";
import moment from 'moment';
import { getTimeEntries } from "../services/TimeEntriesService";

export default class Controlers extends Component {
    state = {
        data: { date: "" },
        errors: {},
        timeEntries:[],
        sortColumn: { path: "title", order: "Desc" },
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
        console.log("component did mount")    
        const { data } = await getTimeEntries();
        console.log("controllers data",data)
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
        this.setState({timeEntries})
      } 

      handleSort = (sortColumn) => {
        console.log("sortColumn", sortColumn);
        this.setState({ sortColumn });
    };


      

  render() {
    const { timeEntries , sortColumn } = this.state;
    console.log(timeEntries)
    return (
      <div>
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

