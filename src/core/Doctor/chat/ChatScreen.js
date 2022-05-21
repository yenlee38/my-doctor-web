import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import {
  addDoc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import NavDoctor from "../../Component/nav/NavDoctor";
import SenderMessage from "./components/SenderMessage";
import "./styles/SenderMessageStyle.css";
import ReceiverMessage from "./components/ReceiverMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import PatientChatComponent from "./components/PatientChatComponent";
import { getId } from "../../../model/account";
import { getAllPatient } from "../../../model/patient";
import { getAllRegistrationByDoctor } from "../../../model/registration";
import { convertTimestampToDate } from "../../../utils/formats";
import { Facebook } from "react-content-loader";
import SearchComponent from "./components/SearchComponent";

const ChatScreen = () => {
  const [inactive, setInactive] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageSend, setMessageSend] = useState("");
  const [dateSends, setDateSends] = useState([]);
  const userId = getId;
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const MyChatLoader = () => <Facebook />;
  useEffect(() => {
    setIsLoading(true);
    getAllPatient().then((lAccount) => {
      getAllRegistrationByDoctor(getId).then((lRes) => {
        // setPatients(getPatientsByRegistration(lAccount, lRes));
        let listPatient = [];
        lRes?.forEach((res) => {
          lAccount.some((account) => {
            if (res.patientId === account.id && res.status === "CONFIRMED") {
              listPatient.push(account);
              return;
            }
          });
        });
        setReceiverId(listPatient[0].id);
        setIsLoading(false);
        listPatient.forEach((patient) => {
          onSnapshot(
            query(
              collection(db, "message"),
              where("users", "in", [
                [patient.id, userId],
                [userId, patient.id],
              ])
            ),
            (snapshot) => {
              patient.lastSend = snapshot?.docs
                .map((mess) => mess.data())
                .sort(function (x, y) {
                  return y.createdAt - x.createdAt;
                })[0];
              setPatients(listPatient);
              setIsLoading(false);
            }
          );
        });
      });
    });
  }, [db]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "message"),
        where("users", "in", [
          [userId, receiverId],
          [receiverId, userId],
        ])
      ),
      (snapshot) => {
        setMessages(
          snapshot?.docs
            .map((mess) => mess.data())
            .sort(function (x, y) {
              return x.createdAt - y.createdAt;
            })
        );
      }
    );
  }, [receiverId, db]);

  const onChangeText = (event) => {
    setMessageSend(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (messageSend) {
      addDoc(collection(db, "message"), {
        senderId: userId,
        receiverId: receiverId,
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [userId, receiverId],
        message: messageSend,
      });
    }
    setMessageSend("");
  };

  const checkIsSelected = (id) => {
    return receiverId === id;
  };

  const EmptyChat = () => {
    return (
      <div className="empty-chat-view">
        <div className="empty-chat-container">
          <img
            style={{ height: 200, width: 200 }}
            src="../../../../../assets/imgs/patient.gif"
          />
          <div className="txtEmpty">Hãy bắt đầu tin nhắn mới!</div>
        </div>
      </div>
    );
  };
  const EmptyItem = () => {
    if (isLoading === true && patients.length === 0) {
      return (
        <div>
          <MyChatLoader />
          <MyChatLoader />
          <MyChatLoader />
          <MyChatLoader />
          <MyChatLoader />
          <MyChatLoader />
        </div>
      );
    } else if ((isLoading === false && patients.length) === 0)
      return (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: 50, width: 50 }}
            src="../../../../../assets/imgs/icon_user.png"
          />
          <div className="txtEmpty">Bạn hiện chưa có bệnh nhân đăng ký</div>
        </div>
      );
    return null;
  };
  return (
    <>
      {" "}
      <NavDoctor
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
      />
      <div
        className={`container container-main-chat ${
          inactive ? "inactive" : ""
        }`}
      >
        {" "}
        <div className="screen-chat">
          <div className="list-chat-container">
            {/* <SearchComponent /> */}
            <EmptyItem />
            {patients.map((patient) => (
              <PatientChatComponent
                name={patient.fullName}
                lastSend={patient.lastSend?.message}
                createdAt={
                  convertTimestampToDate(patient.lastSend?.createdAt).time
                }
                isSelected={checkIsSelected(patient.id)}
                setReceiverId={() => setReceiverId(patient.id)}
              />
            ))}
          </div>
          <div className="chat-container">
            <div className="header-chat"></div>
            <ScrollToBottom className="chat-content-container">
              {messages.length === 0 ? <EmptyChat /> : null}
              {messages.map((mess) => {
                return mess.senderId == userId ? (
                  <>
                    <SenderMessage
                      message={mess.message}
                      datetime={
                        convertTimestampToDate(mess.createdAt).date +
                        " " +
                        convertTimestampToDate(mess.createdAt).time
                      }
                    />
                  </>
                ) : (
                  <>
                    <ReceiverMessage
                      message={mess.message}
                      datetime={
                        convertTimestampToDate(mess.createdAt).date +
                        " " +
                        convertTimestampToDate(mess.createdAt).time
                      }
                    />
                  </>
                );
              })}
            </ScrollToBottom>
            <div className="input-send-container">
              <input
                className="input-send"
                value={messageSend}
                onKeyDown={handleKeyDown}
                onChange={onChangeText}
                placeholder={"Gửi tin nhắn..."}
              />
              <i
                style={{ marginLeft: 5, marginRight: 5, color: "#79DAE8" }}
                onClick={sendMessage}
                class="bi bi-send-fill"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
