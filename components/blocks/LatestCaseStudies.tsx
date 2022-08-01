import Container from '../layout/Container';
import Link from '../components/Link';
import { ILatestCaseStudies } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/LatestCaseStudies.module.scss';
import CaseStudyGrid from '../components/CaseStudyGrid';

const LatestCaseStudies = ({
  hashId,
  caseStudies,
  link,
}: Required<ILatestCaseStudies>) => {
  return (
    <div id={hashId} className={styles.latestCaseStudies}>
      <Container>
        <CaseStudyGrid caseStudies={caseStudies} />
        <div className={styles.button}>
          <Link {...link} className="button" />
        </div>
      </Container>
    </div>
  );
};

export default LatestCaseStudies;
