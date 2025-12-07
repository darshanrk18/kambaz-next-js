import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none d-xl-block ms-4" style={{ minWidth: "300px" }}>
        <CourseStatus />
      </div>
    </div>
  );
}