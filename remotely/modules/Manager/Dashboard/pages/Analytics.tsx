import { useEffect, useState } from "react";
import { generateAnalytics } from "../utils/managerApis";

function AnalyticsTable() {
  const [analyticsData, setAnalyticsData] = useState<
    { uid: string; name: string; completionRate: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await generateAnalytics();
        setAnalyticsData(response.data);
      } catch (err) {
        setError("Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Function to convert the data to CSV format
  const convertToCSV = () => {
    const header = ["Employee Name", "Completion Rate"];
    const rows = analyticsData.map(({ name, completionRate }) => [
      name,
      (completionRate * 100).toFixed(2) + "%",
    ]);

    // Combine header and rows into a single CSV string
    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Function to trigger the download of the CSV file
  const downloadCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "task_completion_analytics.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Employee Task Completion Analytics
      </h2>

      {/* Button to trigger CSV download */}
      <div className="text-center mb-4">
        <button
          onClick={downloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Download as CSV
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-left">Employee Name</th>
              <th className="px-6 py-3 text-left">Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map(({ uid, name, completionRate }) => (
              <tr
                key={uid}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="px-6 py-4">{name}</td>
                <td className="px-6 py-4">
                  {(completionRate * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnalyticsTable;
