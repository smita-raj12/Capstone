import React, {Component} from 'react'
import WorkOrderForm from './WorkOrderForm'
import { getWorkOrders, saveWorkOrder } from '../services/WorkOrderService';


class WorkOrders extends Component {
  state = {
    workOrders: []
  };

  async componentDidMount() {
    const   { data: workOrders }   =  await getWorkOrders(); 
    console.log(workOrders)
    this.setState({workOrders})
  }

  handleSave =  async (workOrder) => {
    try {
      const { data: newWorkOrder } = await saveWorkOrder(workOrder);

      if (workOrder._id.startsWith("new")) {
          const workOrders = this.state.workOrders;
       

        workOrders.push({
          _id: newWorkOrder._id,
          name: workOrder.name,
          desc: workOrder.desc,
        });

        
        this.setState({ workOrders });
      }
    } catch (ex) {
      if (ex.response) console.log("ex.repsonse", ex.response);
    }
  }

  handleDelete = async (workOrder) => {
    console.log(workOrder);
  }

  render(){
    const {workOrders} = this.state
    
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