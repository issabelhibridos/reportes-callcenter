import React from 'react'

export const ReportRow = ({ reg }) => {
    const { numero, fecha, queue, espero } = reg
    return (
        <>
            <tr className=" text-gray-900 bg-defaultbg rounded-lg hover:bg-yellow-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {numero}
                </th>
                <td className="px-6 py-4">
                    {queue}
                </td>
                <td className="px-6 py-4">
                    {fecha}
                </td>
                <td className="px-6 py-4">
                    {espero}
                </td>
            </tr>
        </>
    )
}
