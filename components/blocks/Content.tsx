import classNames from 'classnames';
import Container from '../layout/Container';
import RichText from '../components/RichText';
import { IContent } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/Content.module.scss';

const Content = ({
  hashId,
  content,
  containerWidth,
  centerText,
  boldText,
}: IContent) => {
  return (
    <div id={hashId} className={classNames(styles.content, { boldText })}>
      <Container {...{ [containerWidth.toLowerCase()]: true }}>
        <RichText wrap className={classNames({ centerText })}>
          {content}
        </RichText>
      </Container>
    </div>
  );
};

export default Content;
