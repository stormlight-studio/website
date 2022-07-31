import Container from '../layout/Container';
import RichText from '../components/RichText';
import Image from '../components/Image';
import BlogArticleGrid from '../components/BlogArticleGrid';
import Link from '../components/Link';
import FormattedDate from '../components/FormattedDate';
import Share from '../components/Share';
import { IBlogArticle } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/BlogArticle.module.scss';

const BlogArticle = ({
  title,
  image,
  showImageOnArticlePage,
  categories,
  author,
  date,
  content,
  associatedBlogArticles,
}: IBlogArticle) => {
  return (
    <div className={styles.blogArticle}>
      <Container large>
        {showImageOnArticlePage && (
          <Image {...image} lazyload={false} className={styles.image} />
        )}
        <h1>{title}</h1>
        <p className={styles.author}>
          by {author}, <FormattedDate date={date} />
        </p>
        <ul className={styles.categories}>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <div className={styles.content}>
          <div className={styles.share}>
            <Share />
          </div>
          <RichText wrap>{content}</RichText>
        </div>
      </Container>
      <Container>
        <div className={styles.exploreMore}>
          <h3>Explore More</h3>
          <BlogArticleGrid
            blogArticles={associatedBlogArticles}
            hideCategories
          />
          <Link
            href="/ideas-and-insights"
            text="See all posts"
            className="button inverted small"
          />
        </div>
      </Container>
    </div>
  );
};

export default BlogArticle;
