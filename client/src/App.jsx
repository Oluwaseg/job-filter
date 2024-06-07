import { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import JobLoader from "./components/JobLoader";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://job-filter-ncb8.onrender.com/api/jobs");
      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    // Fetch jobs data when the component mounts
    fetchJobs();
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  const addJob = async (newJob) => {
    try {
      const res = await fetch("https://job-filter-ncb8.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
      const addedJob = await res.json();
      setJobs((prevJobs) => [...prevJobs, addedJob]);
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(
        `https://job-filter-ncb8.onrender.com/api/jobs/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  };

  const updateJob = async (updatedJob) => {
    try {
      const res = await fetch(
        `https://job-filter-ncb8.onrender.com/api/jobs/${updatedJob.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJob),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update job");
      }
      const updatedJobData = await res.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === updatedJobData.id ? updatedJobData : job
        )
      );
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/jobs" element={<JobsPage jobs={jobs} />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={JobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={JobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
