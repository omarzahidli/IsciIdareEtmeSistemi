import { useState } from "react";

export default function AddWorker({allEmpl, setAllEmpl}) {
    const saheler = new Set(allEmpl.map(emp => emp.saha)) 
    const [data, setData] = useState({
        ad: "",
        soyad: "",
        yas: "",
        maas: "",
        staj: "",
        saha: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        if (
            !data.ad ||
            !data.soyad ||
            !data.maas ||
            !data.yas ||
            !data.staj ||
            !data.saha
        ) {
            alert("Bütün sahələri doldurun!");
            return;
        }

        if (data.yas < 0 || data.staj < 0 || data.maas < 0) {
            alert("Mənfi dəyərlərə icazə verilmir!");
            return;
        }
        setAllEmpl([...allEmpl, data])
        setData({
        ad: "",
        soyad: "",
        yas: "",
        maas: "",
        staj: "",
        saha: ""
        })
    }


  return (
    <div className="p-6 bg-white rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">+ Yeni İşçi Əlavə Et</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="ad" placeholder="Ad" value={data.ad} onChange={handleChange} className="border p-2 rounded" />
        <input name="soyad" placeholder="Soyad" value={data.soyad} onChange={handleChange} className="border p-2 rounded" />
        <input name="maas" placeholder="Maaş" value={data.maas} onChange={handleChange} className="border p-2 rounded" />
        <input name="yas" placeholder="Yaş" value={data.yas} onChange={handleChange} className="border p-2 rounded" />
        <input name="staj" placeholder="İş stajı" value={data.staj} onChange={handleChange} className="border p-2 rounded" />
        <select name="saha" value={data.saha} onChange={handleChange} className="border p-2 rounded text-gray-600">
            <option disabled value="">İş sahəsi seçin</option>
            {Array.from(saheler).map((saheler, ind) => {
                return (
                    <option key={ind}>{saheler}</option>
                )
            })}
        </select>
        <button
          onClick={handleClick}
          className="col-span-full md:col-span-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Əlavə et
        </button>
      </div>
    </div>
  );
}