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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Employee Task Completion Analytics
      </h2>
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
