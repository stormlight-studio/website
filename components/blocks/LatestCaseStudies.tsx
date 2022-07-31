import Container from '../layout/Container';
import Link from '../components/Link';
import { ILatestCaseStudies } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/LatestCaseStudies.module.scss';
import CaseStudyGrid from '../components/CaseStudyGrid';

const LatestCaseStudies = ({
  hashId,
  title,
  description,
  caseStudies,
  link,
}: Required<ILatestCaseStudies>) => {
  return (
    <div id={hashId} className={styles.latestCaseStudies}>
      <Container narrow>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </Container>
      <Container>
        <CaseStudyGrid caseStudies={caseStudies} />
        <Link {...link} className="button" />
      </Container>
    </div>
  );
};

export default LatestCaseStudies;
