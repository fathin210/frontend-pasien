import { AiOutlineHome, AiOutlineUser, AiOutlineHistory } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
export const nav = [
  {
    to: "/",
    path: "Home",
    icon: <AiOutlineHome className="text-2xl" />,
  },
  {
    to: "/booking",
    path: "Booking",
    icon: <BsBookmarkCheck className="text-2xl" />,
  },
  {
    to: "/user",
    path: "Profile",
    icon: <AiOutlineUser className="text-2xl" />,
  },
];
