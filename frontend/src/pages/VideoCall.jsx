import React, { useEffect, useRef, useState, useCallback } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { BsTelephoneX } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaStopCircle } from "react-icons/fa";
import Chat from "../components/Chat";
import { useStore } from "../store/store.js";
import "./VideoCall.scss";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io.connect(`${API_URL}`, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const VideoCall = () => {
  const { user } = useStore();
  const [role, setRole] = useState(user.role);

  const [peers, setPeers] = useState([]);
  const [myUserId, setMyUserId] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const screenVideoRef = useRef(null);
  const screenStreamRef = useRef(null);
  const videoContainer = useRef();

  const navigate = useNavigate();
  const params = useParams();

  const myVideo = useRef();
  const peersRef = useRef({});
  const streamRef = useRef();
  const hiddenVoice = useRef();

  const createPeer = useCallback((userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      if (signal.type === "offer") {
        socket.emit("sending-signal", { userToSignal, callerID, signal });
      }
    });

    peer.on("error", (err) => {
      console.log("Peer error: ", err);
      if (err.toString().includes("Connection failed")) {
        removePeer(userToSignal);
      }
    });

    return peer;
  }, []);

  const addPeer = useCallback((incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      if (signal.type === "answer") {
        socket.emit("returning-signal", { signal, callerID });
      }
    });

    peer.on("error", (err) => {
      console.log("Peer error: ", err);
      if (err.toString().includes("Connection failed")) {
        removePeer(callerID);
      }
    });

    try {
      peer.signal(incomingSignal);
    } catch (err) {
      console.error("Error signaling peer:", err);
    }

    return peer;
  }, []);

  const removePeer = useCallback((peerId) => {
    if (peersRef.current[peerId]) {
      peersRef.current[peerId].destroy();
      delete peersRef.current[peerId];
    }
    setPeers((prevPeers) => prevPeers.filter((p) => p.peerID !== peerId));
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        stream.getTracks().forEach((track) => (track.enabled = false));
        myVideo.current.srcObject = stream;

        socket.emit("join-room", params.id);

        socket.on("your-id", (id) => {
          setMyUserId(id);
        });

        socket.on("all-users", (users) => {
          setUserCount(users.length + 1);
          users.forEach((userID) => {
            if (!peersRef.current[userID]) {
              const peer = createPeer(userID, socket.id, stream);
              peersRef.current[userID] = peer;
              setPeers((prevPeers) => [...prevPeers, { peerID: userID, peer }]);
            }
          });
        });

        socket.on("user-joined", (payload) => {
          setUserCount((prevCount) => prevCount + 1);
          if (!peersRef.current[payload.callerID]) {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current[payload.callerID] = peer;
            setPeers((prevPeers) => [
              ...prevPeers,
              { peerID: payload.callerID, peer },
            ]);
          }
        });

        socket.on("receiving-returned-signal", (payload) => {
          const peer = peersRef.current[payload.id];
          if (peer && !peer.destroyed) {
            try {
              peer.signal(payload.signal);
            } catch (err) {
              removePeer(payload.id);
            }
          }
        });

        socket.on("user-disconnected", (userId) => {
          setUserCount((prevCount) => prevCount - 1);
          removePeer(userId);
        });
      });

    return () => {
      socket.emit("disconnect-from-room", params.id);
      socket.off("your-id");
      socket.off("all-users");
      socket.off("user-joined");
      socket.off("receiving-returned-signal");
      socket.off("user-disconnected");
      streamRef.current?.getTracks().forEach((track) => track.stop());
      Object.values(peersRef.current).forEach((peer) => peer.destroy());
      peersRef.current = {};
      setPeers([]);
    };
  }, [params.id, addPeer, removePeer, createPeer]);

  const handleDisconnect = () => {
    socket.emit("disconnect-from-room", params.id);
    navigate("/createroom");
  };

  const handleVoice = () => {
    const audioTrack = streamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
      if (hiddenVoice.current) {
        hiddenVoice.current.style.display = audioTrack.enabled ? "none" : "block";
      }
    }
  };

  const handleVideo = () => {
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenVideoRef.current.srcObject = screenStream;
      screenStreamRef.current = screenStream;
      setIsSharing(true);
      videoContainer.current.classList.remove("screen-hidden");
      screenStream.getVideoTracks()[0].onended = () => stopScreenShare();
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      videoContainer.current.classList.add("screen-hidden");
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      setIsSharing(false);
    }
  };

  return (
    <div className="video-call-page">
      {/* Video Section */}
      <div className="video-area">
        {/* Screen Share Overlay */}
        <div ref={videoContainer} className="screen-share screen-hidden">
          <video ref={screenVideoRef} autoPlay playsInline className="screen-video" />
          <span className="screen-badge">
            <FaDesktop /> Sharing Screen
          </span>
        </div>

        {/* Main Video Grid */}
        <div className="video-grid">
          {/* My Video */}
          <div className="video-box my-video">
            <img
              ref={hiddenVoice}
              className="mute-icon"
              src="/no-noise.png"
              alt="muted"
              style={{ display: 'block' }}
            />
            <video autoPlay playsInline muted ref={myVideo} className="video" />
            <span className="name-tag">You ({role})</span>
          </div>

          {/* Peer Videos */}
          {peers.map((peer, index) => (
            <PeerVideo key={index} peer={peer.peer} index={index} />
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="controls">
          <button
            onClick={handleVoice}
            className={`btn-control ${!isAudioEnabled ? 'off' : 'on'}`}
          >
            {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>

          <button
            onClick={handleVideo}
            className={`btn-control ${!isVideoEnabled ? 'off' : 'on'}`}
          >
            {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
          </button>

          {!isSharing ? (
            <button onClick={startScreenShare} className="btn-control share">
              <FaDesktop />
            </button>
          ) : (
            <button onClick={stopScreenShare} className="btn-control share active">
              <FaStopCircle />
            </button>
          )}

          <button onClick={handleDisconnect} className="btn-control end">
            <BsTelephoneX />
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-area">
        <Chat />
      </div>
    </div>
  );
};

const PeerVideo = ({ peer, index }) => {
  const ref = useRef();
  const muteRef = useRef();

  useEffect(() => {
    if (peer) {
      peer.on("stream", (stream) => {
        if (ref.current) {
          ref.current.srcObject = stream;
        }
        const audioTrack = stream.getAudioTracks()[0];
        if (muteRef.current) {
          muteRef.current.style.display = audioTrack?.enabled === false ? 'block' : 'none';
        }
      });
    }
  }, [peer]);

  return (
    <div className="video-box">
      <img ref={muteRef} className="mute-icon" src="/no-noise.png" alt="muted" />
      <video autoPlay playsInline ref={ref} className="video" />
      <span className="name-tag">Participant {index + 1}</span>
    </div>
  );
};

export default VideoCall;