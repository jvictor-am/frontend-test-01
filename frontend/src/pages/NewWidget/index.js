import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';
import { maxBy } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';

function NewWidget() {
  const [formTitle, setTitle] = useState('');
  const [formSeries, setSeries] = useState('');
  const [errors, setErrors] = useState({});

  const [widgets, setWidgets] = useState({});

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadWidgets() {
      const response = await api.get('widgets');

      const data = response.data.map(widget => ({
        ...widget,
      }));

      setWidgets(data);
    }

    loadWidgets();
  }, []);

  const isValidForm = () => {
    let valid = true;
    let result = { ...errors };

    // Form title should not be empty
    if (!formTitle || formTitle === '') {
      result = { ...result, title: true };
      valid = false;
    }

    // Form series should not be empty
    if (!formSeries || formSeries === '') {
      result = { ...result, series: true };
      valid = false;
    }

    setErrors(result);
    return valid;
  };

  async function submitHandler(event) {
    event.preventDefault();

    if (!isValidForm()) return;

    const maxValue = maxBy(widgets, 'id') || { id: 0 };

    const series = formSeries
      // Remove spaces
      .replace(/\s/g, '')
      // String into array
      .split(',')
      // String to number
      .map(x => parseInt(x, 10))
      // Only numbers
      .filter(x => Number(x));

    // setWidgets({
    //   id: Number(id) || maxValue.id + 1,
    //   title: formTitle,
    //   series: series,
    // });

    const data = {
      id: Number(id) || maxValue.id + 1,
      title: formTitle,
      series: series,
    };

    // console.log(widgets);
    console.log(data);
    (await api.post('widgets', data)) && history.push('/');
  }

  const handleChangeTitle = event => setTitle(event.target.value);

  const handleChangeSeries = event => {
    const value = event.target.value;
    const digit = value.charAt(value.length - 1);
    const last = value.charAt(value.length - 2);

    // Event should be clear
    if (digit === '' && last === '') {
      setSeries('');
      return;
    }

    // Event should de Number, Space or Comma
    if (!Number(digit) && digit !== ' ' && digit !== ',') return;

    // Event should be Number when last is Space
    if (last === ' ' && !Number(digit)) return;

    setSeries(event.target.value);
  };

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Field>
            <h2>Título</h2>
            <input
              placeholder="Nome do Widget..."
              type="text"
              onChange={handleChangeTitle}
              value={formTitle}
            />
            {errors.title && <h4>Necessário preencher título.</h4>}
          </Form.Field>
          <Form.Field>
            <h2>Valores</h2>
            <input
              placeholder="Valores separados por vírgula..."
              type="text"
              onChange={handleChangeSeries}
              value={formSeries}
            />
          </Form.Field>
          {errors.series && <h4>Necessário preencher com valores.</h4>}
          <Button type="submit" color="orange">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default NewWidget;
