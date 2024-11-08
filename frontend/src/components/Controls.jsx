import AddButton from "./AddButton";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import colors from "../assets/colors.json";
import Color from "./Color";
import { toast } from "react-toastify";

import power from "../assets/power.svg";

const Controls = () => {
  const { logOut, user } = useContext(NotesContext);
  return (
    <div className="flex flex-col gap-4 items-center fixed left-4 top-[50%] translate-y-[-50%] bg-[#35363e] p-4 rounded-[40px] shadow-customShadow z-[9999]">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} className="size-10" />
      ))}
      {user && (
        <div
          onClick={() => {
            logOut();
            toast.success("Log out succesfully", {
              autoClose: 2000,
            });
          }}
          className="bg-red-400 relative size-10 rounded-full transition-all duration-300 cursor-pointer flex justify-center items-center logout"
        >
          <img src={power} alt="Logout" className="size-7" />
          <div className="absolute top-0 left-12 bg-gray-500 px-5 py-1.5 rounded-md shadow-md opacity-0 transition-opacity duration-300">
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;
