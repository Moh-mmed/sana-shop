import s from "./FeaturedTable.module.css";

const FeaturedTable = () => {
    const rows = [
      {
        id: 1565156,
        product: "Acer Nitro 5",
        img: "https://picsum.photos/300",
        customer: "John Smith",
        date: "1 March",
        amount: 785,
        method: "Cash on Delivery",
        status: "Approved",
      },
      {
        id: 1575156,
        product: "Acer Nitro 5",
        img: "https://picsum.photos/300",
        customer: "John Smith",
        date: "1 March",
        amount: 785,
        method: "Cash on Delivery",
        status: "Pending",
      },
      {
        id: 1585156,
        product: "Acer Nitro 4",
        img: "https://picsum.photos/300",
        customer: "John Smith",
        date: "1 March",
        amount: 785,
        method: "Cash on Delivery",
        status: "Approved",
      },
      {
        id: 1595156,
        product: "Acer Nitro 6",
        img: "https://picsum.photos/300",
        customer: "John Smith",
        date: "1 March",
        amount: 785,
        method: "Cash on Delivery",
        status: "Pending",
      },
    ];

  return (
    <section className={s.root}>
       <div className={s.title}>Latest Transactions</div>
    <div className={s.table_container}>
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col" className={s.th}>Product name</th>
            <th scope="col" className={s.th}>Color</th>
            <th scope="col" className={s.th}>Category</th>
            <th scope="col" className={s.th}>Price</th>
            <th scope="col" className={s.th}>
              <span className={s['sr-only']}>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={s.table}>
            <th scope="row" className={s.td}>Apple MacBook Pro 17&quot;</th>
            <td className={s.td}>Silver</td>
            <td className={s.td}>Laptop</td>
            <td className={s.td}>$2999</td>
            <td className={s.td}>
              <a href="#" className={s.link}>Edit</a>
            </td>
          </tr>
          <tr className={s.table}>
            <th scope="row" className={s.td}>Microsoft Surface Pro</th>
            <td className={s.td}>White</td>
            <td className={s.td}>Laptop PC</td>
            <td className={s.td}>$1999</td>
            <td className={s.td}>
              <a href="#" className={s.link}>Edit</a>
            </td>
          </tr>
          <tr className={s.table}>
            <th scope="row" className={s.td}>Magic Mouse 2</th>
            <td className={s.td}>Black</td>
            <td className={s.td}>Accessories</td>
            <td className={s.td}>$99</td>
            <td className={s.td}>
              <a href="#" className={s.link}>Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   </section>
  );
}

export default FeaturedTable;