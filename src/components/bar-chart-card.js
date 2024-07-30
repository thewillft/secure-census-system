import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import Card from './card';


export default function BarChartCard({ title, subtitle, labels, data, datasetLabel }) {
    return (
        <Card
            title={title}
            subtitle={subtitle}
            body={(
            <div>
                {labels && data && <Bar
                options={{
                    responsive: true,
                    plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Age',
                    },
                    },
                }}
                data={{
                    labels,
                    datasets: [{ label: datasetLabel, data }]
                }}
                />}
            </div>
            )}
        />
    )
}