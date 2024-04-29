import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { REGEX } from "../../constants/common";
import CustomError from "../../services/CustomError";
import { useDispatch } from "react-redux";
import { UserApiService } from "../../services/Users";
import { enableSnackbar } from "../../store/reducers/snackBarReducer";
import { useNavigate } from "react-router-dom";

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const authObj = new UserApiService();
          const response = await authObj.getUser({}, token);
          console.log(response);
          
          if (REGEX.SUCCESS_CODE.test(response.status.toString())) {
            setUsers(response.data.userDetails);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        let snackBarpayload = {
          message: "Api Failed In Get Details With Status 500",
          visible: true,
        };
        if (error instanceof CustomError) {
          snackBarpayload.message = error.message;
        }
        dispatch(enableSnackbar(snackBarpayload));
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div id="chat">
      <main>
        <aside>
          <div className="title">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            </div>
            <p>Connect</p>
          </div>
          <div className="searchbar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input type="text" placeholder="Search Friends" />
          </div>
        </aside>
        <section>
          <nav></nav>
          <div></div>
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default Chat;
