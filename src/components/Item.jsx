
function Item({empl}) {
  return (
    <div className="bg-[#F9FAFC] p-5">
        <h3 className="text-xl font-bold">{empl.ad + ' ' + empl.soyad}</h3>
        <p>Sahə: {empl.saha}</p>
        <p>Yaş: {empl.yas}</p>
        <p>Staj: {empl.staj} il</p>
        <p>Maaş: {empl.maas} AZN</p>
    </div>
  )
}

export default Item