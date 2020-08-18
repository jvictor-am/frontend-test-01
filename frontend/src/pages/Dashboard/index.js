import React, { useState, useEffect } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Widget from '../../components/Widget';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [search, setSearch] = useState('');
  // const [widgetId, setWidgetId] = useState(null);

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

  // const removeItem = itemId => {
  //   setWidgetId(itemId);
  //   console.log(widgetId);
  // };

  // const removeItem = () => {
  //   console.log('heloooo');
  //   setWidgets(widgets.filter(e => e.id !== widgetId));
  // };

  // const handleRemove = setWidgets(widgets.filter(e => e.id !== widgets.id));

  const handleSearch = e => setSearch(e.target.value);

  const inputFilter = input => {
    if (search) {
      return input.title.toLowerCase().includes(search);
    }
    return input;
  };

  const filteredWidgets = widgets.filter(e => inputFilter(e));

  const RenderNoResults = () =>
    filteredWidgets.length === 0 && (
      <>
        <br />
        <h3>
          Não encontramos nenhum gráfico que contenha "{search}" no título.
        </h3>
      </>
    );

  const RenderWidgets = () =>
    filteredWidgets
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(item => (
        <Widget
          key={item.title}
          widget={item}
          // onClickEdit={onEditItem}
          // clickRemove={removeItem}
        />
      ));

  return (
    <>
      <Header SearchBox onSearch={handleSearch} />
      <Container>
        {search ? (
          <>
            <RenderNoResults />
            <RenderWidgets />
          </>
        ) : (
          widgets.map(widget => (
            <li key={widget.id}>
              <Widget widget={widget} data={widgets} />
            </li>
          ))
        )}
        <Link to="/new-widget">
          <Button
            className="btn"
            circular
            icon="plus"
            size="huge"
            color="
          orange"
            // onClick={addWidget}
          />
        </Link>
      </Container>
    </>
  );
}

export default Dashboard;
