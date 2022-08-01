import { IThreeColumns } from '../../@types/generated/contentful';
import Image from '../components/Image';
import Container from '../layout/Container';
import styles from '../../styles/components/blocks/ThreeColumns.module.scss';
import Link from '../components/Link';

const ThreeColumns = ({ columns }: IThreeColumns) => {
  return (
    <div className={styles.threeColumns}>
      <Container>
        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title} className={styles.item}>
              <Image {...column.icon} />
              <h4>
                {column.link ? (
                  <Link href={column.link.href} text={column.title} />
                ) : (
                  column.title
                )}
              </h4>
              <p>{column.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ThreeColumns;
