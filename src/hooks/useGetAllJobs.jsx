import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(searchedQuery)}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          // ✅ Always update Redux, even if jobs is empty
          dispatch(setAllJobs(res.data.jobs));
        } else {
          // ✅ In case API fails but doesn't throw, still clear jobs
          dispatch(setAllJobs([]));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // ✅ On error, also clear job list to avoid stale results
        dispatch(setAllJobs([]));
      }
    };

    fetchAllJobs();
  }, [searchedQuery]); // ✅ Triggers when filter changes
};

export default useGetAllJobs;
