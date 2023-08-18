"use client";

import { useEffect, useState } from "react";

const CurrentMonthDisplay: React.FC = () => {

    const [month, setMonth] = useState<string>("");

    useEffect(() => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentDate = new Date();
        setMonth(monthNames[currentDate.getMonth()]);
     }, []);

    return (
        <div>
            {month}
        </div>
    )
}

export default CurrentMonthDisplay;