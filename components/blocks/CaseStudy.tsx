import Container from '../layout/Container';
import RichText from '../components/RichText';
import Image from '../components/Image';
import CaseStudyGrid from '../components/CaseStudyGrid';
import Link from '../components/Link';
import Share from '../components/Share';
import { ICaseStudy } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/CaseStudy.module.scss';

const CaseStudy = ({
  name,
  title,
  logo,
  intro,
  content,
  associatedCaseStudies,
}: ICaseStudy) => {
  return (
    <div className={styles.caseStudy}>
      <Container large>
        <h2 className={styles.subtitle}>Case Study</h2>
        <h1>{title}</h1>
        <Image {...logo} lazyload={false} />
        <div className={styles.content}>
          <div className={styles.share}>
            <Share />
          </div>
          <div className={styles.intro}>
            <h2>About {name}</h2>
            <RichText wrap>{intro}</RichText>
          </div>
          <RichText wrap>{content}</RichText>
        </div>
      </Container>
      <Container>
        <div className={styles.moreCaseStudies}>
          <h3>More case studies</h3>
          <CaseStudyGrid caseStudies={associatedCaseStudies} />
          <br />
          <br />
          <Link
            href="/case-studies"
            text="See all case studies"
            className="button inverted small"
          />
        </div>
      </Container>
    </div>
  );
};

export default CaseStudy;
