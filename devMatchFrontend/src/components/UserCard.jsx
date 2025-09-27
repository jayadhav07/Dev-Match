import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt={firstName + " " + lastName}
          // className="object-cover h-64 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        {about && <p className="text-sm text-gray-500">{about}</p>}

        <div className="card-actions justify-center">
          <button
            className="btn btn-secondary"
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
