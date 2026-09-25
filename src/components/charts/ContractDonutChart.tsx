import React from 'react';
import Chart from 'react-apexcharts';

interface ContractDonutChartProps {
  series: number[];
  labels: string[];
  colors: string[];
}

export const ContractDonutChart: React.FC<ContractDonutChartProps> = ({
  series,
  labels,
  colors,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Instrument Sans', sans-serif",
    },
    colors,
    labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 2,
      colors: ['#ffffff'],
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '11px',
              fontFamily: 'inherit',
              fontWeight: 600,
              color: '#64748B',
              offsetY: -6,
            },
            value: {
              show: true,
              fontSize: '22px',
              fontFamily: 'inherit',
              fontWeight: 800,
              color: '#0F172A',
              offsetY: 4,
              formatter: () => '78%',
            },
            total: {
              show: true,
              label: 'TETAP',
              color: '#64748B',
              fontSize: '11px',
              fontWeight: 700,
              formatter: () => '78%',
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()} karyawan (${((val / 12480) * 100).toFixed(1)}%)`,
      },
    },
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Chart options={options} series={series} type="donut" height={210} width={240} />
    </div>
  );
};
