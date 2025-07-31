import { useLocation } from "react-router-dom";
import useDynamicMeta from "../Component/MetaTagsComponent";

const routeToType = {
  "/": 1,
  "/about": 2,
  "/contact": 3,
  "/services": 4,
  "/blog": 5,
  "/press-release": 6,
  "/login": 7,
};

const MetaWrapper = ({ children }) => {
  const location = useLocation();
  const type = routeToType[location.pathname] || 1;

  useDynamicMeta(type);

  return <>{children}</>;
};

export default MetaWrapper;
