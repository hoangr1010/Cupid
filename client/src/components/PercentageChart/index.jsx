import { PieChart } from "react-minimal-pie-chart";
import { getColorPairHex } from "../../utils/theme";

const PercentageChart = ({ percentage }) => {
  let color;
  if (percentage >= 0 && percentage < 30) {
    color = "pink";
  } else if (percentage >= 30 && percentage < 70) {
    color = "yellow";
  } else if (percentage >= 70 && percentage <= 100) {
    color = "primary";
  }
  const [dark, light] = getColorPairHex(color)

  return (
    <div style={{ position: 'relative', width: '132px', height: '132px' }}>
      <PieChart
        animation
        animationDuration={500}
        animationEasing="ease-out"
        center={[50, 50]}
        data={[
          { value: percentage, color: light },
          { value: 100 - percentage, color: dark },
        ]}
        labelPosition={50}
        lengthAngle={180}
        lineWidth={15}
        paddingAngle={0}
        radius={50}
        startAngle={-180}
        viewBoxSize={[100, 100]}
      />
      <p style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '25px',
      }} className="font-bold">
        {`${percentage}%`}
      </p>
    </div>
  );
};

export default PercentageChart;
