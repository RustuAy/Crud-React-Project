import { IoIosBriefcase } from "react-icons/io";
import { RiVipCrownFill } from "react-icons/ri";
import { FaCalendarDays } from "react-icons/fa6";
import api from "../utils/api";
import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ListItem = ({ todo, setTodos }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const icon =
    todo.status === "important" ? (
      <RiVipCrownFill className="text-danger fs-4" />
    ) : todo.status === "job" ? (
      <IoIosBriefcase className="text-primary fs-4" />
    ) : (
      <FaCalendarDays className="text-success fs-4" />
    );

  // *silme butonuna tıklanınca çalışır
  const handleDelete = () => {
    // * APİ'a todoyu silmek için istek at
    // ?Fetch istek örneği
    // fetch(`http://localhost:4040/todos/${todo.id}`, { method: "delete" });
    // * APİ'a todoyu silmek için istek at
    api
      .delete(`/todos/${todo.id}`)
      // *State güncelle
      .then(() => {
        setTodos((todos) => todos.filter((item) => item.id !== todo.id));
        // *Bildirim gönder
        toast.info("Todo Kaldırıldı");
      });
  };

  return (
    <li className="p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
      {icon}
      <span>{todo.title}</span>

      <div className="btn-group">
        <button
          onClick={() => SetIsOpen(true)}
          className="btn btn-sm btn-primary"
        >
          Düzenle
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">
          Sil
        </button>
      </div>

      {isOpen && (
        <Modal todo={todo} setTodos={setTodos} close={() => SetIsOpen(false)} />
      )}
    </li>
  );
};

export default ListItem;
