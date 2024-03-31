import React from 'react';
import JoinHeader from "../../assets/images/JoinHeader.jpg"
import Header from "../../components/Header";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const styles = {
  hugeMarginLeft: {
    marginLeft: '20rem',
  },
};

const InactiveAccount = () => {
  return (
    <div>
      <Header imageUrl={JoinHeader} />
      <Row className="justify-content-center">
        <Col xs={10}>
          <h1>Inactive Account Information</h1>
          <p>You can't login and fear that your account is inactive?</p>
          <p>There are generally two reasons why your account could be inactive.</p>
          <ol className="ml-huge" style={styles.hugeMarginLeft}> {/* Applying custom CSS class for huge left margin */}
            <li>You haven't verified your email yet.</li>
            <li>Your account has been set to inactive, due to a significant amount of inappropriate comments</li>
          </ol>
          <p>In both cases, please check your email address for further instructions.</p>

          <h4 style={{ textAlign: "center" }}>General Information on inappropriate Comments</h4>
          <p>To create a save space to share content, our users can mark other user's comments as inappropriate in case of any offences.</p>
          <p>If this happened to you, you will find an information email with further details in your mail inbox.</p>

          <h4 style={{ textAlign: "center" }}>You have any questions or need assistance?</h4>
          <p>Please contact: andrea.gorsche@gmail.com </p>
        </Col>
      </Row>
    </div>
  );
};

export default InactiveAccount;
