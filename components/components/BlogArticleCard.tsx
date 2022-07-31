import classNames from 'classnames';
import FormattedDate from './FormattedDate';
import Link from './Link';
import Image from './Image';
import { IBlogArticle } from '../../@types/generated/contentful';
import styles from '../../styles/components/components/BlogArticleCard.module.scss';

const BlogArticleCard = ({
  image,
  imageQuote,
  imageQuoteColour,
  title,
  categories,
  author,
  date,
  url,
}: IBlogArticle) => (
  <div className={styles.blogArticleCard}>
    <Link href={url} className={styles.imageLink}>
      <figure>
        {imageQuote ? (
          <>
            <div
              className={classNames(
                styles.imageQuote,
                styles.imageQuoteBackground,
                imageQuoteColour?.toLowerCase()
              )}
            />
            <div className={styles.imageQuote}>{imageQuote}</div>
          </>
        ) : (
          <Image {...image} />
        )}
      </figure>
    </Link>
    <h4>
      <Link href={url} text={title} />
    </h4>
    <p className={styles.author}>
      by {author} • <FormattedDate date={date} />
    </p>
    <ul className={styles.categories}>
      {categories.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  </div>
);

export default BlogArticleCard;
