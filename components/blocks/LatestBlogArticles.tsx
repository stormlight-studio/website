import Container from '../layout/Container';
import Link from '../components/Link';
import { ILatestBlogArticles } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/LatestBlogArticles.module.scss';
import BlogArticleGrid from '../components/BlogArticleGrid';

const LatestBlogArticles = ({
  hashId,
  blogArticles,
  link,
}: Required<ILatestBlogArticles>) => {
  return (
    <div id={hashId} className={styles.latestBlogArticles}>
      <Container>
        <BlogArticleGrid blogArticles={blogArticles} hideCategories />
        <div className={styles.button}>
          <Link {...link} className="button" />
        </div>
      </Container>
    </div>
  );
};

export default LatestBlogArticles;
