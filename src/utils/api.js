import axios from "axios";

// * axios.create methodu axios'un bazı temel ayarlarını belirlediğimiz bir axios örneği oluşturur.
// *örnek olarak baseUrl'i belirlersek kod tekrarı yapmadan sadece gerekli istek kısmı yazılır.
const api = axios.create({ baseURL: "http://localhost:4040" });

export default api;
