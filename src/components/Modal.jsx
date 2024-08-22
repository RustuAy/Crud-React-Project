import { toast } from "react-toastify";
import api from "../utils/api";

const Modal = ({ close, todo, setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = e.target[0].value;
    const newStatus = e.target[1].value;

    if (!newTitle.trim()) return toast.warn("Lütfen başlığı belirleyin");

    // *APİ'a todo'nun güncellenmesi için istek at
    api
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus,
      })
      // *istek başarılı olursa state'i güncelle
      .then((res) => {
        setTodos((prev) =>
          prev.map((item) => (item.id == res.data.id ? res.data : item))
        );
        toast.success("Başarıyla güncellendi");
      })
      .catch((err) => toast.error("İşlem başarısız!!"));
    // *modal kapat
    close();
  };

  return (
    <div className="modal d-block bg-black bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">TODO'yu Düzenle</h5>
            <button onClick={close} className="btn-close"></button>
          </div>
          <div className="modal-body">
            {/* todo form alanı oluştur */}
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Yeni Başlığı giriniz</label>
                <input
                  defaultValue={todo.title}
                  className="form-control shadow "
                />
              </div>
              <div className="my-4">
                <label className="form-label">Yeni Durumu Seçiniz</label>
                <select
                  defaultValue={todo.status}
                  className="form-select shadow"
                >
                  <option value="daily">Günlük</option>
                  <option value="job">İş</option>
                  <option value="important">Önemli</option>
                </select>
              </div>
              <div className="modal-footer mt-5">
                <button
                  onClick={close}
                  type="button"
                  className="btn btn-secondary"
                >
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
