import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AboutPage = () => {
  return (
    <Container>
      <Row>
        <Col>Qui sommes nous?</Col>
      </Row>
      <Row>
        <Col>
          <p>
            Eagle est une société de vente en gros. Nous organisons plusieurs
            événements dans l’année pour vendre des marchandises. 
            Eagle event est un site destiné à gérer les
            évènements organisés par une entreprise. Il permettra aux clients de
            l'entreprise de pouvoir être informer des actualités (événements) de
            l'entreprise. Les clients pourront s'ils le souhaitent réserver pour
            un évènement. Le but de cet application est de facilité d'un côté la
            communication à l'entreprise et de l'autre côté proposer un moyen
            plus facile et accessible aux clients. Ainsi, elle doit répondre à
            plusieurs critères : Proposer des évènements aux clients avec une
            apparence attrayante. Rendre les informations abordables au public.
            Faciliter la communication auprès des clients. Interagir avec le
            client Assurer une gestion du contenu par des administrateurs.
            Proposer un service payant aux utilisateurs. Laisser le choix aux
            clients de pouvoir annuler la réservation s'ils le souhaitent.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
