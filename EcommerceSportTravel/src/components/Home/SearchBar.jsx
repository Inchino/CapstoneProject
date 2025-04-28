import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchData, setSearchData] = useState({
    citta: '',
    squadra: '',
    durata: '',
    parolaChiave: ''
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <Form className="search-bar p-4 mb-5 shadow-sm" onSubmit={handleSubmit}>
      <Row className="gy-3">
        <Col md={3}>
          <Form.Select name="citta" value={searchData.citta} onChange={handleChange}>
            <option value="">Seleziona Città</option>
            <option value="Roma">Roma</option>
            <option value="Napoli">Napoli</option>
            <option value="Firenze">Firenze</option>
            <option value="Torino">Torino</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select name="squadra" value={searchData.squadra} onChange={handleChange}>
            <option value="">Seleziona Squadra</option>
            <option value="Roma FC">Roma FC</option>
            <option value="Napoli">Napoli</option>
            <option value="Juventus">Juventus</option>
            <option value="Fiorentina">Fiorentina</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select name="durata" value={searchData.durata} onChange={handleChange}>
            <option value="">Durata</option>
            <option value="3">3 giorni</option>
            <option value="5">5 giorni</option>
            <option value="7">7 giorni</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Cerca una partita..."
            name="parolaChiave"
            value={searchData.parolaChiave}
            onChange={handleChange}
          />
        </Col>

        <Col md={1}>
          <Button type="submit" variant="warning" className="w-100">
            Cerca
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
