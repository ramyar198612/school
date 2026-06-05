import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", fee: 40 },
  { month: "Feb", fee: 68 },
  { month: "Mar", fee: 60 },
  { month: "Apr", fee: 42 },
  { month: "May", fee: 90 },
  { month: "Jun", fee: 48 },
];

export default function FeeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="fee" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}