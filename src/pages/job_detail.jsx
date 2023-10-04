import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import parser from "html-react-parser";
import MainLayout from "./main_layout";

function JobDetailPage() {
  const [detailJob, setDetailJob] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetailJob = async () => {
    const accessToken = localStorage.getItem(btoa("access_token"));
    try {
      const result = await axios.get(`http://localhost:3000/api/job/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result.data.result;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDetailJob().then((result) => {
      setDetailJob(result);
    });
  }, []);

  return (
    <MainLayout>
      <div className="bg-gray-50 h-full">
        <div className="mx-4 my-4">
          <Link
            to={".."}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <div className="flex flex-row">
              <ArrowLeftIcon
                strokeWidth={3}
                className="h-4 w-4 mr-2 mt-1"
                color="grey"
              />
              <h1 className="text-md font-semibold text-customBlue ">Back</h1>
            </div>
          </Link>
          <div className="w-full h-full bg-white rounded-lg shadow mt-4">
            <div className="py-4 px-4">
              <div className="flex flex-col mb-2">
                <h1 className="text-xs text-gray-600 font-medium">
                  {detailJob && detailJob.location} /{" "}
                  {detailJob && detailJob.type}
                </h1>
                <h1 className="text-3xl font-semibold text-darkBlue">
                  {detailJob && detailJob.title}
                </h1>
                <Link >
                <a href={detailJob && detailJob.company_url}>
                  <h1 className="text-md mt-1 font-semibold text-blue-500">
                    {detailJob && detailJob.company}
                  </h1>
                </a>
                  
                </Link>

                <hr class="h-px mt-6 mb-4 bg-gray-200 border-0"></hr>
                <div className="flex flex-row">
                  <div className="basis-2/3">
                    {detailJob && parser(detailJob.description)}
                  </div>
                  <div className="basis-1/3 ml-14">
                    <table class="w-full text-sm text-left text-gray-500 ">
                      <thead class="text-xs text-gray-900 uppercase bg-darkYellow ">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            How to Apply
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-lightYellow border-b ">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 "
                          >
                            {detailJob && parser(detailJob.how_to_apply)}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default JobDetailPage;
