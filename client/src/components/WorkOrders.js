import React, {Component} from 'react'
import WorkOrderForm from './WorkOrderForm'
import { getWorkOrders, saveWorkOrder , deleteWorkOrder} from '../services/WorkOrderService';
import { toast } from "react-toastify";

class WorkOrders extends Component {
  state = {
    workOrders: [],
    newWorkOrders : []
  };

  async componentDidMount() {
    const   { data: workOrders }   =  await getWorkOrders(); 
    
    workOrders.push({
      _id: 0,
      name: " ",
      desc: " "
    })
    console.log(workOrders);
    this.setState({workOrders})
  }

  handleSave =  async (workOrder) => {
    try {
      const { data: newWorkOrder } = await saveWorkOrder(workOrder);
      if (workOrder._id === 0) {
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
    const origionalworkOrders = this.state.workOrders;
        const workOrders = origionalworkOrders.filter(
            (m) => m._id !== workOrder._id
        );
        this.setState({ workOrders });
    
        try {
            
            await deleteWorkOrder(workOrder._id);
        } catch (ex) {
            console.log("HANDLE DELETE CATCH BLOCK");
            if (ex.response && ex.response.status === 404)
                toast.error("This post has already been deleted");
            this.setState({ workOrders: origionalworkOrders });
        }
  }
  // getPageData(){
  //   const { workOrders: allWorkOrders, newWorkOrders } = this.state
  //   const workOrdersWithNew = allWorkOrders.filter((m) =>
  //           m._id < _id);
  //           newWorkOrders.map((o) =>{
  //             workOrdersWithNew.push({

  //             })
  //           })
  // } 
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