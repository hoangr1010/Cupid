import { useNavigate } from "react-router-dom";

const SidebarItem = ({path, text}) => {

  const navigate = useNavigate();

  function nav() {
    navigate(path);
  }

  return (
    <button onClick={nav}>
      {text}
    </button>

  );
}

export default SidebarItem;