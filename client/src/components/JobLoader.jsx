const JobLoader = async ({ params }) => {
  try {
    const response = await fetch(
      `https://job-filter-ncb8.onrender.com/api/jobs/${params.id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch job data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

export default JobLoader;
