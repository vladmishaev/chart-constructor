import { useRef, useEffect } from 'react';
import initChart from './model/initChart';
//import CSSModuleClasses from './Chart.module.css';

type DataChart = {
    value: string;
    category: string;
};

const drawData: Array<DataChart> = [
    { value: '10', category: 'Monday' },
    { value: '8', category: 'Tuesday' },
    { value: '9', category: 'Wednesday' },
    { value: '11', category: 'Thursday' },
    { value: '12', category: 'Friday' },
    { value: '0', category: 'Saturday' },
    { value: '0', category: 'Sunday' },
];

// prettier-ignore
const dataAxisY: Array<string> = [
    '0', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10', '11',
    '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23',
    '24',
];

const dataAxisX: Array<string> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const Chart = () => {
    const refCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        new initChart(refCanvas.current!, drawData, {
            axios: {
                y: {
                    scaleList: dataAxisY,
                },
                x: {
                    scaleList: dataAxisX,
                },
            },
            canvas: {
                padding: 20,
            },
        });
    }, []);

    return <canvas ref={refCanvas}></canvas>;
};

export default Chart;
