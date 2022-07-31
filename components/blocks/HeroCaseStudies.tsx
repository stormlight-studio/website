import nl2br from 'react-nl2br';
import Container from '../layout/Container';
import CaseStudyGrid from '../components/CaseStudyGrid';
import { IHeroCaseStudies } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/HeroCaseStudies.module.scss';

const HeroCaseStudies = ({
  title,
  caseStudies,
}: Required<IHeroCaseStudies>) => {
  return (
    <div className={styles.heroCaseStudies}>
      <Container>
        <h1>{nl2br(title)}</h1>
        <CaseStudyGrid caseStudies={caseStudies} />
      </Container>
    </div>
  );
};

export default HeroCaseStudies;
