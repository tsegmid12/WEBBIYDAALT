import SchoolForm from "./SchoolForm";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useParams } from "react-router-dom";

export const AdminSchoolForm = ({ isNew }) => {
  const { id } = useParams();
  return (
    <div className="bg-[#f3f7fb] min-h-screen">
      <Topbar />
      <div className="flex pt-14">
        <Sidebar />
        <div className="flex-1 ml-64 px-8 py-8">
          <SchoolForm isNew={isNew} id={id} />
        </div>
      </div>
    </div>
  );
};
