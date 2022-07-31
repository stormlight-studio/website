import { useMemo, useState } from 'react';
import { uniq } from 'lodash';
import classNames from 'classnames';
import BlogArticleCard from './BlogArticleCard';
import { IBlogArticle } from '../../@types/generated/contentful';
import styles from '../../styles/components/components/BlogArticleGrid.module.scss';

interface BlogArticleGridProps {
  blogArticles: IBlogArticle[];
  hideCategories?: boolean;
}

const BlogArticleGrid = ({
  blogArticles,
  hideCategories,
}: BlogArticleGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = useMemo(
    () => uniq(blogArticles.flatMap((blogArticle) => blogArticle.categories)),
    [blogArticles]
  );

  return (
    <div className={styles.blogArticleGrid}>
      {!hideCategories && (
        <nav className={styles.categories}>
          <ul>
            <li className={classNames({ active: !activeCategory })}>
              <button onClick={() => setActiveCategory(null)}>All</button>
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={classNames({ active: activeCategory === category })}
              >
                <button onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className={styles.articles}>
        {blogArticles
          .filter(
            (blogArticle) =>
              !activeCategory || blogArticle.categories.includes(activeCategory)
          )
          .map((blogArticle) => (
            <BlogArticleCard key={blogArticle.url} {...blogArticle} />
          ))}
      </div>
    </div>
  );
};

export default BlogArticleGrid;
