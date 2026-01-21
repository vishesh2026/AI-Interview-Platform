import React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStore } from "../store/store.js";
import "./Room.scss";

uuidv4();

const API_URL = import.meta.env.VITE_API_URL;

const socket = io.connect(`${API_URL}`, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const Room = () => {
  const { user } = useStore();

  const [roomName, setRoomName] = useState("");
  const [joinRoomID, setJoinRoomID] = useState("");

  const ref = useRef();
  const myVideo = useRef();
  const myAudio = useRef();
  const streamRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        ref.current.srcObject = stream;
        stream.getTracks().forEach((track) => (track.enabled = false));
        const videoTrack = streamRef.current.getVideoTracks()[0];
        videoTrack.stop();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createRoom = () => {
    const rid = uuidv4();
    socket.emit("create-room", { roomId: rid, roomName });
    navigate(`/createroom/${rid}`);
  };

  const joinRoom = () => {
    if (joinRoomID.trim() === "") {
      alert("Please enter a valid Room ID");
      return;
    }
    socket.emit("join-room", joinRoomID);
    navigate(`/createroom/${joinRoomID}`);
  };

  const handleVoice = () => {
    const audioTrack = streamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      myAudio.current.firstChild.src = audioTrack.enabled
        ? "/mic.png"
        : "/no-noise.png";
    }
  };

  const handleVideo = async () => {
    const videoTrack = streamRef.current.getVideoTracks()[0];

    if (videoTrack) {
      if (videoTrack.enabled) {
        videoTrack.enabled = false;
        videoTrack.stop();
        myVideo.current.firstChild.src = "/no-video.png";
      } else {
        await navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            streamRef.current = stream;
            ref.current.srcObject = stream;
          })
          .catch((err) => {
            console.log(err);
          });
        videoTrack.enabled = true;
        myVideo.current.firstChild.src = "/video-camera.png";
      }
    }
  };

  return (
    <div className="room-container">
      <div className="video-preview-section">
        <div className="video-wrapper">
          <video
            ref={ref}
            muted
            autoPlay
            playsInline
            className="preview-video"
          ></video>
          <div className="video-controls">
            <button
              onClick={handleVoice}
              ref={myAudio}
              className="control-btn audio-btn"
            >
              <img src="/no-noise.png" alt="mic" className="control-icon" />
            </button>
            <button
              onClick={handleVideo}
              ref={myVideo}
              className="control-btn video-btn"
            >
              <img src="/no-video.png" alt="video" className="control-icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="room-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Start Your Interview</h1>
            <p>Create a new room or join an existing one</p>
          </div>

          <div className="form-card">
            <div className="create-room-section">
              <div className="section-header">
                <span className="section-icon">🎯</span>
                <h2>Create New Room</h2>
              </div>
              <input
                type="text"
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter Room Name (min 5 characters)"
                value={roomName}
                className="room-input"
              />
              <button
                onClick={createRoom}
                className="action-btn create-btn"
                disabled={roomName.length < 5}
              >
                <span className="btn-icon">➕</span>
                Create Room
              </button>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="join-room-section">
              <div className="section-header">
                <span className="section-icon">🔗</span>
                <h2>Join Existing Room</h2>
              </div>
              <input
                type="text"
                onChange={(e) => setJoinRoomID(e.target.value)}
                placeholder="Enter Room ID"
                value={joinRoomID}
                className="room-input"
              />
              <button onClick={joinRoom} className="action-btn join-btn">
                <span className="btn-icon">🚀</span>
                Join Room
              </button>
            </div>
          </div>

          <Link to={"/"} className="back-link">
            <span>←</span> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;