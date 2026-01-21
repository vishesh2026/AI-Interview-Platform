import { useStore } from "../../store/store";
import CandidateProfile from "./CandidateProfile";
import InterviewerProfile from "./InterviewerProfile";

const ProfileRouter = () => {
  const { user } = useStore();

  if (!user) return null;

  return user.role === "interviewer"
    ? <InterviewerProfile />
    : <CandidateProfile />;
};

export default ProfileRouter;
