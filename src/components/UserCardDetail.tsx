type card = {
  email : string;
  address : string;
}
import { BsMailbox2, BsFillPinMapFill } from "react-icons/bs";

export const UserCardDetail = ({ email, address } : card) => {
  return (
    <div className="text-center">
      <p>
        <BsMailbox2 /> {email}
      </p>
      <p>
        <BsFillPinMapFill /> {address}
      </p>
    </div>
  );
};
