import React, { useState } from 'react'
import TimeEntryForm from './TimeEntryForm';

function TimeEntries () {

    const [timeEntries, setTimeEntries] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
 
    return (
        <div><TimeEntryForm/></div>
    )
    }


export default TimeEntries;