import CountUp from 'react-countup';
import { IStats } from '../../@types/generated/contentful';
import Container from '../layout/Container';
import styles from '../../styles/components/blocks/Stats.module.scss';

const Stats = ({ stats }: IStats) => {
  return (
    <div className={styles.stats}>
      <Container>
        <div className={styles.columns}>
          {stats.map((stat) => (
            <div key={stat.title} className={styles.item}>
              <CountUp
                end={stat.number}
                duration={3}
                prefix={stat.prefix ?? ''}
                suffix={stat.suffix ?? ''}
                decimals={String(stat.number).split('.')[1]?.length ?? 0}
              />
              <h5>{stat.title}</h5>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Stats;
