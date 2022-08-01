import Image from './Image';
import Link from './Link';
import { ICaseStudy } from '../../@types/generated/contentful';
import styles from '../../styles/components/components/CaseStudyGrid.module.scss';

interface CaseStudyGridProps {
  caseStudies: ICaseStudy[];
}

const CaseStudyGrid = ({ caseStudies }: CaseStudyGridProps) => {
  return (
    <div className={styles.caseStudyGrid}>
      {caseStudies.map(({ title, url, logo, name, summary }) => (
        <div key={url} className={styles.caseStudy}>
          <div>
            <h2>Our work</h2>
            <h3>
              <Link href={url} text={title} />
            </h3>
            <p>{summary}</p>
          </div>
          <Image {...logo} alt={name} />
        </div>
      ))}
    </div>
  );
};

export default CaseStudyGrid;
