'use client'

import { useEffect, useState } from "react";
import Card from '../../../components/card'
 
export default function DashboardPage() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function fetchAuditLogs() {
            try {
                const resp = await fetch('/api/admin/audit');
                if (!resp.ok) throw(resp.status)
                const data = await resp.json();
                setLogs(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchAuditLogs();
    }, [])


    return (
        <main className="flex items-center justify-center py-3">
            <div className=" space-y-1">
                <Card 
                    title={'Audit Logs'}
                    subtitle={'Displaying up to 100 of the most recent user actions'}
                    body={(
                        <table>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>User ID</th>
                                <th>Action</th>
                                <th>Target</th>
                                <th>Date</th>
                            </tr>
                            {logs && logs.map(log => (
                                <tr className={'text-sm'}>
                                    {/* <td>{log['id']}</td> */}
                                    <td>{log['user_id']}</td>
                                    <td>{log['action']}</td>
                                    <td>{log['target']}</td>
                                    <td>{log['date']?.replace('T', ' ')?.split('.')[0]}</td>
                                </tr>
                            ))}
                        </table>
                    )}
                />
            </div>
        </main>
    );
}