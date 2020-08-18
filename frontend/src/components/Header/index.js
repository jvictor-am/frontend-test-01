import React from 'react';
import { Header, Segment, Image, Input } from 'semantic-ui-react';
import logo from '../../assets/logo2.png';
import './styles.css';

function MainHeader({ SearchBox, onSearch }) {
  return (
    <Segment clearing>
      {SearchBox && (
        <Header as="h2" floated="right">
          <Input
            icon="search"
            size="mini"
            placeholder="Pesquise pelo título..."
            onChange={onSearch}
          />
        </Header>
      )}
      <Header floated="left" href="/">
        <Image src={logo} size="massive" alt="Logo" />
      </Header>
    </Segment>
  );
}

export default MainHeader;
