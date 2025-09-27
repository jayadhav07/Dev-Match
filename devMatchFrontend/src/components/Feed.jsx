import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(response.data.data);
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed && feed.length > 0 ? (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
      {/* <UserCard /> */}
    </div>
  ) : (
    <p>No new users found</p>
  );
};

export default Feed;
