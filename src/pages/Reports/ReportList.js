import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getLikeSearch } from "../../services";
import { toast } from "react-toastify";
import { ReportRow } from "./components/ReportRow";
import dateTime from 'date-time';

export const ReportList = () => {
  const [result, setResult] = useState([]);
  const { start, finish } = useParams();

  useEffect(() => {
    async function fetchResult() {
      try {
        const data = await getLikeSearch(dateTime({ date: new Date(start) }), dateTime({ date: new Date(finish) }));
        setResult(data);
      } catch (error) {
        toast.error(error.message,)
      }
    }
    fetchResult();
  }, [start, finish])

  console.log(result)

  return (
    <main>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  text-gray-900 bg-defaultbg rounded-lg hover:bg-yellow-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-gray-900 bg-defaultbg hover:bg-yellow-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700">
                Numero
              </th>
              <th scope="col" className="px-6 py-3  text-gray-900 bg-defaultbg hover:bg-yellow-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" >
                Cola
              </th>
              <th scope="col" className="px-6 py-3 text-gray-900 bg-defaultbg hover:bg-yellow-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" >
                Fecha
              </th>
              <th scope="col" className="px-6 py-3  text-gray-900 bg-defaultbg hover:bg-yellow-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700">
                Espero
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((reg) => (
              <ReportRow key={reg.uniqueid} reg={reg} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

