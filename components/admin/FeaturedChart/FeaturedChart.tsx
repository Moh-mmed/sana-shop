import { useState } from 'react';
import s from './FeaturedChart.module.css'
import CircularChart from './CircularChart';
import { CgMoreVerticalAlt } from 'react-icons/cg'
import { MdKeyboardArrowUp,MdKeyboardArrowDown} from 'react-icons/md'


const initialChart = {
  sqSize: 130,
  percentage:60,
  strokeWidth: 6,
}

const FeaturedChart = () => {
  const [chart, setChart] = useState(initialChart);
 
  return (
    <div className={s.root}>
      <div className={s.top}>
        <h1 className={s.title}>Total Revenue</h1>
        <CgMoreVerticalAlt fontSize="small" />
      </div>
      <div className={s.bottom}>
        <CircularChart chart={initialChart} />
        <p className={s.title}>Total sales made today</p>
        <p className={s.amount}>$420</p>
        <p className={s.desc}>
          Previous transactions processing. Last payment may not be included
        </p>
        <div className={s.summary}>
          <div className={s.item}>
            <div className={s.itemTitle}>Target</div>
            <div className={`${s.itemResult} ${s.negative}`}>
              <MdKeyboardArrowDown fontSize="small" />
              <div className={s.resultAmount}>$18.5k</div>
            </div>
          </div>
          <div className={s.item}>
            <div className={s.itemTitle}>Last Week</div>
            <div className={`${s.itemResult} ${s.positive}`}>
              <MdKeyboardArrowUp fontSize="small" />
              <div className={s.resultAmount}>$10.9k</div>
            </div>
          </div>
          <div className={s.item}>
            <div className={s.itemTitle}>Last Month</div>
            <div className={`${s.itemResult} ${s.positive}`}>
              <MdKeyboardArrowUp fontSize="small" />
              <div className={s.resultAmount}>$12.3k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedChart