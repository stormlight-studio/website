import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Container from '../layout/Container';
import { IQuotes } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/Quotes.module.scss';

const Quotes = ({ hashId, quotes }: IQuotes) => {
  return (
    <div id={hashId} className={styles.quotes}>
      <Swiper
        modules={[Navigation, Pagination]}
        loop
        navigation
        pagination
        className={styles.swiper}
      >
        {quotes.map((quote) => (
          <SwiperSlide key={quote.name + quote.company}>
            <Container medium className={styles.quote}>
              <blockquote>&ldquo;{quote.quote}&rdquo;</blockquote>
              <p>
                <span>{quote.name}</span> - <span>{quote.company}</span>
              </p>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Quotes;
