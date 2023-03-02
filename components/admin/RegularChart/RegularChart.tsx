import LineChart from './LineChart';
import s from './RegularChart.module.css'

type PropsTypes = {
  title: string
}

const RegularChart:React.FC<PropsTypes> = ({title}) => {
  return (
    <div className={s.regularChart}>
      <h1 className={s.title}>{title}</h1>
      <LineChart />
    </div>
  );
}

export default RegularChart



