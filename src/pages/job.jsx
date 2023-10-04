import MainLayout from "./main_layout";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function JobPage() {
  const [active, setActive] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const checkbox = useRef();

  const getJob = async () => {
    let queryParam = "";
    if (location != "") {
      queryParam = `&location=${location}`;
    }
    if (description != "") {
      queryParam += `&description=${description}`;
    }
    if (checkbox.current.checked) {
        queryParam += `&is_fulltime`;
      }

    const accessToken = localStorage.getItem(btoa("access_token"));
    try {
      const result = await axios.get(
        `http://localhost:3000/api/job?page=${active}&limit=4${queryParam}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return result.data.result;
    } catch (error) {
      alert(error);
    }
  };

  const fetchJobByParameter = async () => {
    const result = await getJob();
    console.log(result);
    setJobList(result.data);
    setTotalPage(result.total_pages);
  };

  useEffect(() => {
    getJob().then((result) => {
      setJobList(result.data);
      setTotalPage(result.total_pages);
    });
  }, []);

  const next = () => {
    if (active === totalPage) return;
    fetchJobByParameter();
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    fetchJobByParameter();
    setActive(active - 1);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 h-full">
        <div className="mx-4 my-4">
          <div className="flex flex-row space-x-4">
            <div className="basis-1/3">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Job Description
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Filter by job description"
                required=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="basis-1/3">
              <label
                for="location"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Filter by location"
                required=""
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className=" flex items-end justify-center basis-1/3">
              <div className="flex items-center">
                <input
                  id="fulltime-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  ref={checkbox}                
                />
                <label
                  for="fulltime-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Full Time
                </label>
                <button
                  type="submit"
                  className="ml-8 w-28 text-white bg-customBlue  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={fetchJobByParameter}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg shadow mt-4">
            <div className="py-4 px-4">
              <div className="flex flex-col mb-2">
                <h1 className="text-3xl font-semibold">Job List</h1>
                <hr class="h-px mt-6 bg-gray-200 border-0"></hr>
                {!totalPage || totalPage > 0 ? (
                  jobList.map((job) => (
                    <Link to={`/job-detail/${job.id}`}>
                      <div className="flex flex-row mt-4 justify-between ">
                        <div className="flex flex-col ">
                          <h1 className="text-md text-customBlue font-semibold">
                            {job.title}
                          </h1>
                          <div className="flex flex-row justify-start align-middle">
                            <h1 className="text-xs text-gray-600 font-normal">
                              {job.company}
                            </h1>
                            <h1 className="text-xs mx-1 text-gray-600 font-normal">
                              -
                            </h1>
                            <h1 className="text-xs text-green-600 font-semibold">
                              {job.type}
                            </h1>
                          </div>
                        </div>
                        <div className="flex flex-col align-middle text-end">
                          <h1 className="text-xs text-gray-600 font-semibold">
                            {job.location}
                          </h1>
                          <h1 className="text-xs text-gray-600 font-normal">
                            {job.created_at}
                          </h1>
                        </div>
                      </div>
                      <hr class="h-px mt-2 bg-gray-200 border-0"></hr>
                    </Link>
                  ))
                ) : (
                  <h1 className="text-3xl font-semibold text-center mt-4">
                    Tidak ada data ditemukan
                  </h1>
                )}
              </div>
            </div>
          </div>
          {totalPage > 0 ? (
            <div className="flex py-4 justify-center">
              <div className="flex items-center gap-8">
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={prev}
                  disabled={active === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                  Page <strong className="text-gray-900">{active}</strong> of{" "}
                  <strong className="text-gray-900">{totalPage}</strong>
                </Typography>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={next}
                  disabled={active === totalPage}
                >
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default JobPage;
