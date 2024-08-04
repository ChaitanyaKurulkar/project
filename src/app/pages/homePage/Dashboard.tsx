import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getCounts, getDeptProjects } from "../../../api/DashboardAPI";
import { DashboardData, DepartmentCounts } from "../../types/types";
import BarChart from "./BarChart";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({
    statusCounts: [],
    totalProjects: 0,
  });

  const [dataDept, setDataDept] = useState<DepartmentCounts>({
    departmentCounts: [],
    totalProjects: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCounts();
        setData(result);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataDept = async () => {
      try {
        const result = await getDeptProjects();
        setDataDept(result);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDataDept();
  }, []);

  const chartData = {
    labels: dataDept.departmentCounts.map((d) => d.department || "Unknown"),
    datasets: [
      {
        label: "Total Projects",
        data: dataDept.departmentCounts.map((d) => d.total || 0),
        backgroundColor: "rgba(75, 192, 75, 0.2)",
        borderColor: "rgba(75, 192, 75, 1)",
        borderWidth: 1,
      },
      {
        label: "Closed Projects",
        data: dataDept.departmentCounts.map((d) => d.closed || 0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const statusCounts: Record<string, number> = data.statusCounts.reduce(
    (acc, item) => {
      acc[item.status] = item.count;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <div>
        <Header title="Dashboard" />
        <div
          className="d-flex flex-wrap justify-content-end"
          style={{ marginTop: "-33px" }}
        >
          <div
            className="card"
            style={{ width: "14rem", border: "1px solid #0f0f0f" }}
          >
            <div className="card-body">
              <h5 className="card-title">Total Projects</h5>
              <h3 className="card-subtitle mb-2 text-muted">
                {data.totalProjects}
              </h3>
            </div>
          </div>

          <div
            className="card ms-2"
            style={{ width: "14rem", border: "1px solid #0f0f0f" }}
          >
            <div className="card-body">
              <h5 className="card-title">Closed</h5>
              <h3 className="card-subtitle mb-2 text-muted">
                {statusCounts["Closed"] || 0}
              </h3>
            </div>
          </div>

          <div
            className="card ms-2"
            style={{ width: "14rem", border: "1px solid #0f0f0f" }}
          >
            <div className="card-body">
              <h5 className="card-title">Running</h5>
              <h3 className="card-subtitle mb-2 text-muted">
                {statusCounts["Running"] || 0}
              </h3>
            </div>
          </div>

          <div
            className="card ms-2"
            style={{ width: "14rem", border: "1px solid #0f0f0f" }}
          >
            <div className="card-body">
              <h5 className="card-title">Closure Delay</h5>
              <h3 className="card-subtitle mb-2 text-muted">
                {statusCounts["Registered"] || 0}
              </h3>
            </div>
          </div>

          <div
            className="card ms-2"
            style={{ width: "14rem", border: "1px solid #0f0f0f" }}
          >
            <div className="card-body">
              <h5 className="card-title">Cancelled</h5>
              <h3 className="card-subtitle mb-2 text-muted">
                {statusCounts["Cancelled"] || 0}
              </h3>
            </div>
          </div>
        </div>
        <h4 className="text-center mt-2 mb-2">
          Department wise - Total vs Closed
        </h4>
        <div
          style={{
            width: "80%",
            maxWidth: "600px",
            margin: "0 auto",
            marginLeft: "10px",
          }}
        >
          <BarChart data={chartData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
