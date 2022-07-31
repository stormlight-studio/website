import nl2br from 'react-nl2br';
import Container from '../layout/Container';
import BlogArticleGrid from '../components/BlogArticleGrid';
import { IHeroBlog } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/HeroBlog.module.scss';

const HeroBlog = (props: IHeroBlog) => {
  const { title, blogArticles } = props;
  return (
    <>
      <div className={styles.heroBlog}>
        <Container>
          <h1>{nl2br(title)}</h1>
        </Container>
      </div>
      <Container>
        <BlogArticleGrid blogArticles={blogArticles} />
      </Container>
    </>
  );
};

export default HeroBlog;
