import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", attendance: 50 },
  { day: "Tue", attendance: 55 },
  { day: "Wed", attendance: 76 },
  { day: "Thu", attendance: 65 },
  { day: "Fri", attendance: 82 },
  { day: "Sat", attendance: 70 },
  { day: "Sun", attendance: 92 },
];

export default function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="attendance"
          stroke="#4f46e5"
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}