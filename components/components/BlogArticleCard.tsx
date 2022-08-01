import FormattedDate from './FormattedDate';
import Link from './Link';
import Image from './Image';
import { IBlogArticle } from '../../@types/generated/contentful';
import styles from '../../styles/components/components/BlogArticleCard.module.scss';

const BlogArticleCard = ({
  image,
  title,
  summary,
  categories,
  author,
  date,
  url,
}: IBlogArticle) => (
  <div className={styles.blogArticleCard}>
    <div>
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <h3>
        <Link href={url} text={title} />
      </h3>
      <p>{summary}</p>
      <p className={styles.author}>
        by {author} • <FormattedDate date={date} />
      </p>
    </div>
    <Image {...image} />
  </div>
);

export default BlogArticleCard;
