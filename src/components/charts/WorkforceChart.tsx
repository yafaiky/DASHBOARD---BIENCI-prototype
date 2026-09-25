import React from 'react';
import Chart from 'react-apexcharts';

interface WorkforceChartProps {
  categories: string[];
  activeData: number[];
  joinersData: number[];
  resignedData: number[];
}

export const WorkforceChart: React.FC<WorkforceChartProps> = ({
  categories,
  activeData,
  joinersData,
  resignedData,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 310,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "'Instrument Sans', sans-serif",
    },
    colors: ['#172B4D', '#16A34A', '#DC2626'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [3, 2.5, 2.5],
      dashArray: [0, 0, 4],
    },
    fill: {
      type: ['gradient', 'solid', 'solid'],
      opacity: [0.35, 1, 1],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: [0, 4, 4],
      colors: ['#172B4D', '#16A34A', '#DC2626'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '11px',
          fontWeight: 600,
        },
      },
    },
    yaxis: [
      {
        seriesName: 'Karyawan Aktif',
        title: {
          text: 'Karyawan Aktif',
          style: { color: '#172B4D', fontSize: '11px', fontWeight: 600 },
        },
        min: 9500,
        max: 12500,
        labels: {
          style: { colors: '#64748B', fontSize: '11px' },
          formatter: (val) => `${(val / 1000).toFixed(1)}k`,
        },
      },
      {
        seriesName: 'Karyawan Baru',
        opposite: true,
        title: {
          text: 'Karyawan Masuk / Keluar',
          style: { color: '#16A34A', fontSize: '11px', fontWeight: 600 },
        },
        min: 0,
        max: 400,
        labels: {
          style: { colors: '#64748B', fontSize: '11px' },
          formatter: (val) => `${Math.round(val)}`,
        },
      },
      {
        seriesName: 'Karyawan Keluar (Resign)',
        opposite: true,
        show: false,
        min: 0,
        max: 400,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      y: {
        formatter: (val) => `${val.toLocaleString()} karyawan`,
      },
    },
    legend: { show: false },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
  };

  const series = [
    {
      name: 'Karyawan Aktif',
      type: 'area',
      data: activeData,
    },
    {
      name: 'Karyawan Baru',
      type: 'line',
      data: joinersData,
    },
    {
      name: 'Karyawan Keluar (Resign)',
      type: 'line',
      data: resignedData,
    },
  ];

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="line" height={310} />
    </div>
  );
};
