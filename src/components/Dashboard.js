import React, { useState } from "react";
import TextEditor from "./TextEditor";
import SentEmails from "./SentEmails";
import Inbox from "./Inbox";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [compose, setCompose] = useState(false);
  const [showSentEmails, setShowSentEmails] = useState(false);
  const emails = useSelector((store) => store.email.emails);

  const toggleCompose = () => {
    setCompose(!compose);
  };

  const toggleSentEmails = () => {
    setShowSentEmails(true);
  };

  const toggleInbox = () => {
    setShowSentEmails(false);
    console.log("njknj");
  };

  const Mails = emails?.filter((mail) => mail.isRead === false);

  return (
    <div className="relative md:ml-32 md:flex md:m-10 space-x-5">
      <div className="w-[90%] md:w-[18%] mx-auto flex sm:block flex-wrap bg-gray-900 rounded-3xl bg-opacity-30 py-5 px-5">
      <p>this is DashBoard</p>
        <button
          className="px-10 mx-auto md:px-6 py-3 md:py-5 hover:bg-gray-300 ease-in-out text-center shadow-md  bg-white rounded-2xl my-4 font-semibold"
          onClick={toggleCompose}
        >
          {!compose ? "✒️ Compose" : "❌ Close"}
        </button>
        <button
          className="text-white my-2 w-full transition duration-300 ease-in-out text-lg text-center p-2 border-2 rounded-full border-gray-500 hover:bg-gray-200 hover:bg-opacity-30"
          onClick={toggleInbox}
        >
          📥 Inbox ({Mails?.length})
        </button>
        <button
          className="text-white w-full text-lg transition duration-300 ease-in-out text-center p-2 border-2 rounded-full border-gray-500 hover:bg-gray-200 hover:bg-opacity-30"
          onClick={toggleSentEmails}
        >
          ⏭️ Sent
        </button>
        <button className="text-white my-2 w-full transition duration-300 ease-in-out text-lg text-center p-2 border-2 rounded-full border-gray-500 hover:bg-gray-200 hover:bg-opacity-30">
          ⭐Starred
        </button>
        <button className="text-white w-full text-lg transition duration-300 ease-in-out text-center p-2 border-2 rounded-full border-gray-500 hover:bg-gray-200 hover:bg-opacity-30">
          📄Drafts
        </button>
        <button className="text-white my-2 w-full transition duration-300 ease-in-out text-lg text-center p-2 border-2 rounded-full border-gray-500 hover:bg-gray-200 hover:bg-opacity-30">
          🕛Snoozed
        </button>
      </div>
      <div className="w-[90%] mb-4 mt-4 md:mb-0 md:mt-0 md:w-[80%] bg-white md:h-screen rounded-3xl bg-opacity-70">
        {compose && <TextEditor toggleCompose={toggleCompose} />}
        {showSentEmails ? <SentEmails /> : <Inbox />}
      </div>
    </div>
  );
};

export default Dashboard;
