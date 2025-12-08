import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ClassesList from "./ClassesList";

export const AdminClasses =() =>  {
  return (
    <div className="bg-[#f3f7fb] min-h-screen">
      <Topbar />

      <div className="flex pt-14">
        <Sidebar />

        <div className="flex-1 ml-64 px-8 py-8">
          <ClassesList />
        </div>
      </div>
    </div>
  );
}
