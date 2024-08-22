import { toast } from "react-toastify";
import api from "../utils/api";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault;

    const text = e.target[0].value;
    const status = e.target[1].value;

    // *İnput boşşa uyarı ver ve fonksiyonu durdur.
    if (!text.trim()) {
      return toast.warn("Lütfen içeriği belirleyin");
    }
    // * API 'a gönderilecek nesneyi hazırla

    const newTodo = {
      title: text,
      status,
      date: new Date().toLocaleString("en-us"),
    };

    // * Oluşturduğumuz nesneyi api'a gönder

    api
      .post("/todos", newTodo)

      // *State'e oluşturulan nesneyi kaydet(arayüze ekle)
      .then((res) => {
        setTodos((todos) => [res.data, ...todos]);

        toast.success("Başarıyla oluşturuldu");
      })
      // *Başarısız olursa uyarı gönder
      .catch((err) => toast.error("Bir Sorun Oluştu!!"));

    // *Formu sıfırla
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        placeholder="Ör:React Projesi Yap"
        className="form-control shadow"
      />

      <select className="form-select w-50 shadow">
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
        <option value="important">Önemli</option>
      </select>

      <button className="btn btn-primary shadow">Gönder</button>
    </form>
  );
};

export default Form;
