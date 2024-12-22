import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface AssignmentProgress {
  chartName: string;
  completed: number;
  total: number;
  color: string;
}

function ProgressDonut({
  assignmentProgress,
}: {
  assignmentProgress: AssignmentProgress;
}) {
  const donutChartData = {
    series: [(assignmentProgress.completed / assignmentProgress.total) * 100],
    options: {
      chart: {
        type: "radialBar" as const,
        fontFamily: "inherit",
        foreColor: "#fff",
      },
      colors: [assignmentProgress.color, "#66DA26"],
      labels: [`${assignmentProgress.chartName}`],
      plotOptions: {
        radialBar: {
          track: {
            background: "#2D2D2D",
            opacity: 0.5,
            margin: -18,
          },
          hollow: {
            margin: 0,
            size: "90%",
            background: "transparent",
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: 20,
              show: true,
              color: "#32323A",
              fontSize: "9px",
              fontWeight: "400",
            },
            value: {
              color: "#287AFF",
              fontWeight: "600",
              fontSize: "30px",
              show: true,
              offsetY: -20,
              formatter: function () {
                return `${assignmentProgress.completed}/${assignmentProgress.total}`;
              },
            },
          },
        },
      },
    } as ApexOptions,
  };

  return (
    <div className="w-full">
      <Chart
        options={donutChartData.options}
        series={donutChartData.series}
        type="radialBar"
      />
    </div>
  );
}

export default ProgressDonut;
