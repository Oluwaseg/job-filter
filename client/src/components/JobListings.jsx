import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome
        ? "/api/jobs?_limit=3&_sort=createdAt&_order=desc"
        : "/api/jobs";
      try {
        const res = await fetch(`http://localhost:8000${apiUrl}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching date", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!jobs || jobs.length === 0) {
    return <div>No jobs available</div>;
  }

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// Add prop type validation
JobListings.propTypes = {
  isHome: PropTypes.bool, // Ensure isHome is a boolean
};

export default JobListings;
