import { useState } from "react";
import {initialEmployees}  from "./data"
import { FaMedal, FaRandom, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaSearch } from "react-icons/fa";
import Item from "./components/Item";
import AddWorker from "./components/Add";
import Footer from "./Footer";


function App() {
  const [allEmpl, setAllEmpl] = useState(initialEmployees)
  const saheler = new Set(allEmpl.map(emp => emp.saha)) 
  const [secilmisSahe, setSecilmisSahe] = useState("Bütün Sahələr")
  const [axtarisAd, setAxtarisAd] = useState("")
  const [flag, setFlag] = useState(0)
  const [ageFlag, setAgeFlag] = useState(0)
  const [rand, setRand] = useState(renderRandom())
  const [exp, setExp] = useState(false)
  function resetToDefaults() {
    setAxtarisAd("")
    setSecilmisSahe("Bütün Sahələr")
    setFlag(0)
    setAgeFlag(0)
    setExp(false)
  }
  function renderView(arr) {
    return axtarisAd == "" ?  arr : arr.filter(empl => empl.ad.toLowerCase().includes(axtarisAd.toLowerCase()) || empl.soyad.toLowerCase().includes(axtarisAd.toLowerCase()))
  }
  function renderField(arr) {
    return secilmisSahe == "Bütün Sahələr" ? arr : arr.filter(empl => empl.saha == secilmisSahe)
  }
  function handleSortClick(arg) {
    if (arg === flag) {
      setFlag(0);
    } else {
      setFlag(arg);
    }
  }
  function filterSalary(arg, arr) {
    return arg === 1
      ? arr.sort((a, b) => a.maas - b.maas) :
      arg == 2 ? arr.sort((a, b) => b.maas - a.maas)
      : arr
  }
  function handleAgeClick(arg) {
    if (arg === ageFlag) {
      setAgeFlag(0);
    } else {
      setAgeFlag(arg);
    }
  }
  function filterAge(arr) {
    return ageFlag == 1 ? arr.filter(empl => empl.yas >= 18 && empl.yas <= 25) : 
    ageFlag == 2 ? arr.filter(empl => empl.yas >= 26 && empl.yas <= 30) :
    ageFlag == 3 ? arr.filter(empl => 31 <= empl.yas) : arr
  }
  function renderRandom() {
    return Math.floor(Math.random() * allEmpl.length)
  }
  function getExp(arr) { 
    if (arr && exp) return arr.sort((max, curr) => curr.staj - max.staj)[0] || ""
  }

  
  return (
    <>
      <main>
        <h1 className="p-2 text-3xl font-bold text-center mt-4">İşçi İdarəetmə Sistemi</h1>
        <div className="max-w-[95%] mx-auto my-5">
            <div className="bg-white my-5 p-5 rounded-[5px] shadow">
              <div className="flex flex-col md:flex-row gap-2 justify-between">
                <div className="flex items-center border-[#999] border rounded-[5px] bg-white p-2 gap-1 w-full flex-1/3">
                  <FaSearch  className="text-[#999]"/>
                  <input value={axtarisAd} type="search" onChange={(e) => setAxtarisAd(e.target.value)} className="placeholder:text-[#999] outline-none w-full" placeholder="Ad ilə axtrarış..." />
                </div>
                <div className="flex items-center border-[#999] border rounded-[5px] bg-white p-2 gap-2 w-full flex-1/3">
                  <select value={secilmisSahe} onChange={(e) => setSecilmisSahe(e.target.value)} className="outline-none w-full">
                    <option>Bütün Sahələr</option>
                    {Array.from(saheler).map((saheler, ind) => {
                      return (
                        <option key={ind}>{saheler}</option>
                      )
                    })}
                  </select>
                </div>
                <button className="flex-1/3 bg-[#6A7181] py-1 px-5 rounded-[5px] active:bg-[#53aa1c] transition duration-100 text-white w-full hover:shadow-[#000000a2] hover:shadow" onClick={() => resetToDefaults()}>Filterləri təmizlə</button>
              </div>
              <div className="flex flex-wrap gap-2 my-3">
                <button className={`flex items-center gap-1 p-3 rounded-[5px] hover:shadow-[#000000a2] hover:shadow transition duration-100  ${flag == 1 ? 'bg-[#2B7EFE] text-white' : 'bg-[#F9FAFC] text-[#999]'}`} onClick={() => handleSortClick(1)}><FaRegArrowAltCircleUp /> Maaş (Azdan çoxa)</button>
                <button className={`flex items-center gap-1 p-3 rounded-[5px] hover:shadow-[#000000a2] hover:shadow transition duration-100 ${flag == 2 ? 'bg-[#2B7EFE] text-white' : 'bg-[#F9FAFC] text-[#999]'}`} onClick={() => handleSortClick(2)}><FaRegArrowAltCircleDown /> Maaş (Çoxdan aza)</button>
              </div>
              <div className="flex flex-wrap gap-2 my-3">
                <button className={`flex items-center gap-1 p-3 rounded-[5px] hover:shadow-[#000000a2] hover:shadow transition duration-100 ${ageFlag == 1 ? 'bg-[#2B7EFE] text-white' : 'bg-[#F9FAFC] text-[#999]'}`} onClick={() => handleAgeClick(1)}>18-25 Yaş</button>
                <button className={`flex items-center gap-1 p-3 rounded-[5px] hover:shadow-[#000000a2] hover:shadow transition duration-100 ${ageFlag == 2 ? 'bg-[#2B7EFE] text-white' : 'bg-[#F9FAFC] text-[#999]'}`} onClick={() => handleAgeClick(2)}>26-30 Yaş</button>
                <button className={`flex items-center gap-1 p-3 rounded-[5px] hover:shadow-[#000000a2] hover:shadow transition duration-100 ${ageFlag == 3 ? 'bg-[#2B7EFE] text-white' : 'bg-[#F9FAFC] text-[#999]'}`} onClick={() => handleAgeClick(3)}>31+ Yaş</button>
              </div>
              <div className="flex flex-wrap gap-2 my-3">
                <button className={`flex items-center gap-1 p-3 rounded-[5px] transition duration-100 ${exp ? 'text-yellow-700 bg-yellow-50 border-yellow-500' : 'text-[#999] bg-[#F9FAFC]'}`} onClick={() => setExp(!exp)}><FaMedal /> Ən Təcrübəli İşçi</button>
                <button className="flex items-center gap-1 bg-[#AF46FA] p-3 rounded-[5px] text-white"  onClick={() => setRand(renderRandom())}><FaRandom /> Təsadüfi İşçi</button>
              </div>
            </div>
            <AddWorker setAllEmpl={setAllEmpl} allEmpl={allEmpl} />
            <div className={`mt-4 mx-auto p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md shadow-md ${exp  ? 'flex-col' : 'hidden'}`} >
              <div className="flex items-center gap-2 text-yellow-700 font-semibold text-lg mb-2">
                <FaMedal size={18} />
                Ən Təcrübəli İşçi
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                { getExp(renderView(renderField(filterAge(allEmpl)))) == "" ? (<div>İşçi Yoxdur!</div>) :
                  (<>
                    <p className="text-lg font-bold mb-2"> {getExp(renderView(renderField(filterAge(allEmpl))))?.ad + " " + getExp(renderView(renderField(filterAge(allEmpl))))?.soyad}</p>
                    <p><span className="font-semibold">Sahə:</span> {getExp(renderView(renderField(filterAge(allEmpl))))?.saha}</p>
                    <p><span className="font-semibold">Yaş:</span> {getExp(renderView(renderField(filterAge(allEmpl))))?.yas}</p>
                    <p><span className="font-semibold">Staj:</span> {getExp(renderView(renderField(filterAge(allEmpl))))?.staj} il</p>
                    <p><span className="font-semibold">Maaş:</span> {getExp(renderView(renderField(filterAge(allEmpl))))?.maas} AZN</p>
                  </>)
                }
              </div>
            </div>
            <div className="mt-5 mx-auto p-4 bg-violet-50 border-l-4 border-violet-500 rounded-md shadow-md">
              <div className="flex items-center gap-2 text-violet-700 font-semibold text-lg mb-2">
                <FaRandom size={18} />
                Təsadüfi İşçi
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <p className="text-lg font-bold mb-2">{allEmpl[rand].ad + " " + allEmpl[rand].soyad}</p>
                <p><span className="font-semibold">Sahə:</span> {allEmpl[rand].saha}</p>
                <p><span className="font-semibold">Yaş:</span> {allEmpl[rand].yas}</p>
                <p><span className="font-semibold">Staj:</span> {allEmpl[rand].staj} il</p>
                <p><span className="font-semibold">Maaş:</span> {allEmpl[rand].maas} AZN</p>
              </div>
            </div>
            <div className="bg-white my-5 p-5 rounded-[5px] shadow">
              <h2 className="text-2xl font-bold mb-5">
                İşçilər ({renderView(renderField(filterAge(allEmpl))).length})
              </h2>
              <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
                {renderView(renderField(filterSalary(flag, filterAge(allEmpl)))).map((empl, idx) => <Item key={idx} empl={empl} />)}
              </div>
            </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
