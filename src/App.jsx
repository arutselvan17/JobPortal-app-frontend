import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Jobs from "./pages/Jobs";
import ContactUs from "./pages/ContactUs";
import Login from "./feature/auth/component/Login";
import JobDetailPage from "./component/JobDetail";
import Admin from "./feature/admin/component/Admin";
import ProtectedRoute from "./feature/auth/component/ProtectedRoute";
import AdminDashboard from "./feature/admin/component/AdminDashboard";
import AllUsers from "./feature/admin/component/AllUsers";
import AllCompany from "./feature/admin/component/AllCompany";
import CategoryList from "./feature/admin/component/CategoryList";
import AllJobs from "./feature/admin/component/AllJobs.jsx"
import AllApplications from "./feature/admin/component/AllApplications.jsx";
import AdminEmployerRequests from "./feature/admin/component/AdminEmployerRequests.jsx";
import Employee from "./pages/Employee.jsx";
import Employer from "./pages/Employer.jsx";
import MyJobs from "./feature/jobs/component/MyJobs.jsx";
import PostJob from "./feature/jobs/component/PostJob.jsx";
import Applications from "./feature/jobs/component/Applications.jsx";
import Register from "./feature/auth/component/Register.jsx";
import EmployeeSearchJob from "./feature/Employee/Component/EmployeeSearchJob.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="company" element={<AllCompany />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="jobs" element={<AllJobs />} />
          <Route path="application" element={<AllApplications />} />
          <Route path="employer-requests" element={<AdminEmployerRequests />} />
        </Route>

        <Route 
          path="/employee"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <Employee/>
            </ProtectedRoute>
          }
        >
          <Route path="jobs" element={<EmployeeSearchJob/>}></Route>

        </Route>

        <Route 
          path="/employer"
          element={
            <ProtectedRoute role="EMPLOYER">
              <Employer/>
            </ProtectedRoute>
          }
        >
        
        <Route path="my-jobs" element={<MyJobs/>}></Route>
        <Route path="post-job" element={<PostJob/>}></Route>
        <Route path="applications" element={<Applications/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;