import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const userID = useSelector((store) => store.auth.userID);

  const sendEmailFrom = async () => {
    const details = {
      from: userID,
      subject: subject,
      text: editorState.getCurrentContent().getPlainText(),
      isRead: false,
    };
    const dummyEmail = to
      .toLowerCase()
      .split("")
      .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
      .join("");

    try {
      const response = await fetch(
        `https://react-mailbox-407e2-default-rtdb.firebaseio.com/${dummyEmail}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const sendMailTo = async () => {
    const details = {
      to: to,
      subject: subject,
      text: editorState.getCurrentContent().getPlainText(),
    };
    const dummyEmail = userID
      .toLowerCase()
      .split("")
      .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
      .join("");

    try {
      const response = await fetch(
        `https://react-mailbox-407e2-default-rtdb.firebaseio.com/${dummyEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const sendEmail = () => {
    sendMailTo();
    sendEmailFrom();
    setTo("");
    setEditorState("");
    setSubject("");
    console.log("email is send");
  };

  return (
    // <div className="absolute container mx-auto md:mt-72 w-[90%] md:w-1/2 md:ml-[28%]">
    <div className="absolute container mx-auto mt-11 w-[70%] md:ml-[5%]">
      <div className="bg-white shadow-md p-6 mt-9 rounded-lg">
        <p>this is textEditor</p>
        <h1 className="text-lg font-semibold mb-4 py-2 bg-slate-100 px-2">
          New Message
        </h1>
        <div className="mb-4">
          <label htmlFor="to" className="block mb-2 text-gray-700 font-bold">
            To:
          </label>
          <input
            id="to"
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Receiver Email"
            onChange={(e) => setTo(e.target.value)}
            value={to}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block mb-2 text-gray-700 font-bold"
          >
            Subject:
          </label>
          <input
            id="subject"
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          />
        </div>
        <div className="mb-4">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbarClassName="bg-gray-200 border-t border-gray-300 rounded-t-lg"
            editorClassName="px-4 py-2 border border-gray-300 rounded-b-lg focus:outline-none"
            wrapperClassName="mb-4"
          />
        </div>
        <button
          className="bg-blue-500 shadow-md hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={sendEmail}
        >
          Send
        </button>
        <button
          className="bg-red-500 m-2 shadow-md hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={props.toggleCompose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
