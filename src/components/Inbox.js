import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "./Message";
import { addData } from "../store/emailSlice";
import useOnlineStatus from "../utils/useOnlineStatus";

const Inbox = () => {
  const [emails, setEmails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const userID = useSelector((store) => store.auth.userID);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const dispatch = useDispatch();
  const onlineStatus = useOnlineStatus();

  const fetchData = async () => {
    const dummyEmail = userID
      .toLowerCase()
      .split("")
      .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
      .join("");

    try {
      const response = await fetch(
        `https://react-mailbox-407e2-default-rtdb.firebaseio.com/${dummyEmail}/inbox.json`
      );
      const json = await response.json();
      const loadedData = [];

      for (const key in json) {
        loadedData.push({
          id: key,
          isRead: json[key].isRead,
          subject: json[key].subject,
          from: json[key].from,
          text: json[key].text,
        });
      }
      setEmails(loadedData.reverse());
      dispatch(addData(loadedData));
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const dummyEmail = userID
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://react-mailbox-407e2-default-rtdb.firebaseio.com/${dummyEmail}/inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        //
        fetchData();
      } else {
        const data = await response.json();
        console.log(data.error.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    fetchData();
  };

  const handleEmailClick = (id) => {
    setSelectedEmailId(id);
    handleToggle();
  };

  return (
    <div>
      <p>this is inbox</p>
      {!isLoading && emails.length === 0 && (
        <p className="md:text-3xl text-lg text-center py-20 md:py-0 md:m-20">
          Found no emails.
        </p>
      )}
      {isLoading ? (
        <h1 className="md:text-3xl text-lg text-center py-20 md:py-0 md:m-20">
          Searching for emails...
        </h1>
      ) : !onlineStatus ? (
        <p className="md:text-3xl text-lg text-center py-20 md:py-0 md:m-20">
          Unable to connect to the internet.
        </p>
      ) : (
        emails.map((item) => (
          <div
            className="md:flex w-[100%] md:w-full border-b border-b-.5 border-black"
            key={item.id}
          >
            <Link
              key={item.id}
              className="md:flex md:w-[90%] md:px-0 p-4 py-6"
              onClick={() => handleEmailClick(item.id)}
            >
              <div className="md:w-[30%] text-lg px-5">
                <i class="uil uil-message"></i> From: {item.from}
              </div>
              {!item.isRead && (
                <button className=" bg-blue-600 text-white mx-4 md:mx-0 text-xs p-1 rounded-xl">
                  New
                </button>
              )}
              <div className="md:w-[60%] md:text-lg px-5 font-semibold">
                Subject: {item.subject}
              </div>
            </Link>
            <button onClick={() => handleDelete(item.id)} className="py-4">
              <i class="uil uil-trash-alt"></i>
            </button>
          </div>
        ))
      )}
      {toggle && (
        <Message
          selectedEmailId={selectedEmailId}
          handleToggle={handleToggle}
        />
      )}
    </div>
  );
};

export default Inbox;
