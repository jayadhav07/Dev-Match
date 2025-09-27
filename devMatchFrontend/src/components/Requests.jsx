import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRrquest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  console.log(request);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    console.log(res.data.data);
    dispatch(addRrquest(res.data.data));
  };

  const reviewRequest = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "/request/review" + "/" + status + "/" + _id,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeRequest(_id));

    console.log(res);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;
  if (request.length === 0) return <h1>No request found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Request</h1>
      {request.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
