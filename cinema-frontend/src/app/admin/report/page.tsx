"use client";
import { useToken } from "@/app/components/TokenContext";
import Loading from "@/components/Loading";
import { Report } from "@/types/types";
import { api } from "@/utils/apiAddress";
import axios from "axios";
import { useEffect, useState } from "react";
import DataVisualization from "./components/DataVisualization";
import GoBackBtn from "@/components/GoBackBtn";

const ReportPage = () => {
  const token = useToken();
  const [report, setReport] = useState<Report[] | null>(null);
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2024-02-01");
  const [currMonthStats, setCurrMonthStats] = useState<Report | null>(null);
  const date = new Date();
  const month = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }`;

  useEffect(() => {
    const fetchReport = async () => {
      const response = await axios.get<Report[]>(
        api + `/api/v1/admin/report/range/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
          },
        },
      );
      setReport(response.data);
    };
    const fetchCurrMonthStats = async () => {
      if (currMonthStats === null) {
        const response = await axios.get<Report>(
          api + `/api/v1/admin/report/month/${month}`,
          {
            headers: {
              Authorization: `Bearer ${token?.token}`,
            },
          },
        );
        setCurrMonthStats(response.data);
      }
    };
    fetchCurrMonthStats();
    fetchReport();
  }, [startDate, endDate]);
  if (report === null) {
    return <Loading />;
  }
  return (
    <div className="grid place-items-center mt-5 mx-5">
      <h1 className="text-5xl text-primary p-5 mb-5">Report</h1>
      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          className="input input-primary"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />{" "}
        - <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          className="input input-primary"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex justify-center max-w-lg">
        <div className="">
          {report.map((r) => (
            <div key={r.date} className="stat ">
              <p className="stat-title">Date: {r.date}</p>
              <p className="stat-value">Tickets sold: {r.ticketCount}</p>
              <p className="stat-value">Earned: {r.totalSum}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="stat">
            <p className="stat-title">Stats for current month</p>
            <p className="stat-value">
              Tickets sold this month {currMonthStats?.ticketCount}
            </p>
            <p className="stat-value">
              Earned this month {currMonthStats?.totalSum}
            </p>
          </div>
        </div>
      </div>
      <DataVisualization rangeReport={report} />
    </div>
  );
};

export default ReportPage;
