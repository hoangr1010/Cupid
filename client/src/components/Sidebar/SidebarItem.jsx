import { useNavigate } from "react-router-dom";

const SidebarItem = ({ path, text, icon, isCurrent, isExpanded }) => {
  const navigate = useNavigate();

  function nav() {
    navigate(path);
  }

  return (
    <button
      onClick={nav}
      className={
        isCurrent
          ? "px-5 p-4 bg-primaryLight font-bold text-primaryDark w-full"
          : "px-5 p-4 sidebar-btn w-full"
      }
    >
      <div className="flex gap-2 items-center">
        {icon}
        {isExpanded ? <p>{text}</p> : null}
      </div>
    </button>
  );
};

export default SidebarItem;
