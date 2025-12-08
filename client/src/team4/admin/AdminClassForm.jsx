import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ClassForm from "./ClassForm";

export const AdminClassForm =() =>  {
  return (
    <div className="bg-[#f3f7fb] min-h-screen">
      <Topbar />

      <div className="flex pt-14">
        <Sidebar />

        <div className="flex-1 ml-64 px-8 py-8">
          <ClassForm />
        </div>
      </div>
    </div>
  );
}
