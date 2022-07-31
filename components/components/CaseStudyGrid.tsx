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
      {caseStudies.map(({ url, logo, name, summary }) => (
        <div key={url} className={styles.caseStudy}>
          <div>
            <Image {...logo} alt={name} />
            <p>{summary}</p>
            <Link href={url} text="Find out how" className="textLink" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseStudyGrid;
