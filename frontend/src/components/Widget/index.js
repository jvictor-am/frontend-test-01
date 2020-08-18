import React from 'react';
import { Card, Dropdown, Button, Modal } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import api from '../../services/api';

import './styles.css';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

function Widget({ widget, data }) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });

  const history = useHistory();

  const handleEdit = itemId => history.push(`/widget/${itemId}`);

  const handleRemove = async itemId => {
    await api.delete(`/widgets/${itemId}`);
  };

  const { open, size } = state;

  if (!widget) return null;

  const options = {
    series: [
      {
        color: '#F15922',
        data: widget.series || [],
      },
    ],
    legend: {
      enabled: false,
    },
    yAxis: {
      title: {
        enabled: false,
      },
    },
    title: {
      text: '',
    },
    chart: {
      height: 200,
    },
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {widget.title}
          <Dropdown pointing icon="ellipsis vertical">
            <Dropdown.Menu direction="left">
              <Dropdown.Item onClick={() => handleEdit(widget.id)}>
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch({ type: 'open', size: 'tiny' })}
              >
                Excluir
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card.Content>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
        dimmer="blurring"
      >
        <Modal.Header>Exclusão de Widget</Modal.Header>
        <Modal.Content>
          <h4>
            Tem certeza que deseja excluir? <br />A confirmação não poderá ser
            desfeita.
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Não
          </Button>
          <Button
            positive
            onClick={() => handleRemove(widget.id, dispatch({ type: 'close' }))}
          >
            {/* <Button
            positive
            onClick={
              (() => handleRemove(widget.id), () => dispatch({ type: 'close' }))
            }
          > */}
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    </Card>
  );
}

export default Widget;
