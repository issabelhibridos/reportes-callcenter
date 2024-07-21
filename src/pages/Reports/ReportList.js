import { reportAuth } from "../../services"
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ReportList = () => {

  useEffect(() => {
    async function fetchData() {

        try {
            const data = await reportAuth();
            console.log(data)
        } catch (error) {
          console.log("is here")
            toast.error(error.message,)
        }
    }
    fetchData();
},)

  return (
    <div></div>
  )
}
