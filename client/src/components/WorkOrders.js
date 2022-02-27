import React, {Component} from 'react'
import WorkOrderForm from './WorkOrderForm'
import { getWorkOrders } from './FakeWorkOrders';


class WorkOrders extends Component {
  state = {
    workOrders: []
  };

  componentDidMount() {
    const   workOrders   =  getWorkOrders(); 
    console.log(workOrders)
    this.setState({workOrders})
  }

  handleSave =  async (workOrder) => {
    console.log(workOrder);
  }

  handleDelete = async (workOrder) => {
    console.log(workOrder);
  }

  render(){
    const {workOrders} = this.state
    console.log(workOrders)
  return (
    
    <div> {workOrders.map((item) => {
                        return <div  key={item._id}
                        className="list-inline-item list-group-item-info">      
        <WorkOrderForm 
          workOrder={item}
          onDelete={this.handleDelete}
          onSave={this.handleSave}
        /> 
    </div>
  })}
   </div> 
  )
}
}
export default WorkOrders