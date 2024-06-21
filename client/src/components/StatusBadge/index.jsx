import { getColorPairHex } from "./../../utils/theme.js";

const StatusBadge = ({ color, text }) => {
  const [backgroundColorHex, textColorHex] = getColorPairHex(color);

  return (
    <div
      style={{ backgroundColor: backgroundColorHex }}
      className="w-fit h-fit py-2 px-[10px] rounded-[10px]"
    >
      <p style={{ color: textColorHex }} className="font-bold">
        {text}
      </p>
    </div>
  );
};

export default StatusBadge;
