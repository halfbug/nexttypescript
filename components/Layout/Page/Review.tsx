import React from 'react';
import { Container } from 'react-bootstrap';
import styles from 'styles/Review.module.scss';
import reviewImg from 'assets/images/review.png';

const Review = () => (
  <Container>

    <div className={styles.review_box}>
      {/* <div className={[styles.review_box, styles.review].join(' ')}> */}

      <div className="mx-auto text-center mt-4">
        <img src={reviewImg.src} width={125} alt="review" />
      </div>
      <div className="mx-auto mt-5 text-center">
        <h2>Leave a review</h2>
        <p>
          How was your experience
          <br />
          with a Groupshop soo far ?
        </p>
      </div>
    </div>
  </Container>
);

export default Review;
