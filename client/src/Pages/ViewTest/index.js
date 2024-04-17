import React from 'react'
import { useParams } from "react-router-dom";
const ViewTest = () => {
    const { testId } = useParams();
    console.log(testId)
    return (
        <div>
            this is
        </div>
    )
}

export default ViewTest
