import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Label,
  Table,
  Modal,
  Form,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import dictionary from "./dictionary";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [, setModalEdit] = useState({});

  useEffect(() => {
    if (companies.length === 0) {
      fetch("http://localhost:2000/companies", { method: "GET" })
        .then((response) => response.json())
        .then((res) => {
          if (res) setCompanies(res);
        });
    }
  }, [companies]);

  const [MyId, SetMyId] = useState(0);

  const ListCompanies = companies.map((companie) => (
    <Table.Row key={companie.id}>
      <Table.Cell>
        <Label ribbon>{companie.id}</Label>
      </Table.Cell>
      <Table.Cell>{companie.name}</Table.Cell>
      <Table.Cell>{companie.constitutionDate}</Table.Cell>
      <Table.Cell>{companie.idTypeCompanie}</Table.Cell>
      <Table.Cell>{companie.comments}</Table.Cell>
      <Table.Cell>
        <Button
          key={companie.id}
          color="yellow"
          onClick={() => {
            setOpen(true);
            setModalEdit(companie);
            SetMyId(companie.id);
          }}
        >
          Edit
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  const NowDate = (data) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <input
        type="date"
        // name="trip-start"
        name={data.name}
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      ></input>
    );
  };

  const ModalEdit = () => {
    const [FormValues, setFromValues] = useState({
      id: MyId === 0 ? null : MyId,
    });

    const TypeCompanies = [
      { key: 1, text: "Distribuidor", value: "Distribuidor" },
      { key: 2, text: "Mayorista", value: "Mayorista" },
      { key: 3, text: "Usuario final", value: "Usuario final" },
    ];

    const _onChangeOption = (e) => {
      const x = {
        id: FormValues.id,
        name: FormValues.name,
        constitution_date: FormValues.constitution_date,
        company_type: FormValues.company_type,
        comments: FormValues.comments,
      };
      x[e.target.name] = e.target.value;
      setFromValues(x);
    };

    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => {
          setOpen(false);
          SetMyId(0);
        }}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>Edit!</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                name={dictionary.gn.names[0].toLowerCase()}
                control={Input}
                label={dictionary.es.modal[0]}
                placeholder={dictionary.es.modal[0]}
                onChange={_onChangeOption}
                value={FormValues.name}
              />
              <Form.Field
                // name={dictionary.gn.names[0].toLowerCase()}
                label={dictionary.es.modal[1]}
                control={NowDate}
                start="1"
                end="7"
                // onChange={_onChangeOption}
              />
              <Form.Field
                name={dictionary.gn.names[2]}
                control={Select}
                options={TypeCompanies}
                label={{
                  children: dictionary.es.modal[2],
                }}
                placeholder={dictionary.es.modal[2]}
                search
                onChange={_onChangeOption}
              />
            </Form.Group>
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              name={dictionary.gn.names[3]}
              label={dictionary.es.modal[3]}
              placeholder={dictionary.es.modal[3]}
              onChange={_onChangeOption}
            />
            <Form.Field
              id="form-button-control-public"
              control={Button}
              content={dictionary.es.modal[4]}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
              setModalEdit({});
              SetMyId(0);
            }}
          >
            {dictionary.es.modal[5]}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  return (
    <div className="App">
      <Header as="h2" icon textAlign="center">
        <Icon name="book" circular />
        <Header.Content>This is the test</Header.Content>
      </Header>
      <Divider />
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Fecha de constitucion</Table.HeaderCell>
              <Table.HeaderCell>Tipo de empresa</Table.HeaderCell>
              <Table.HeaderCell>Comentarios</Table.HeaderCell>
              <Table.HeaderCell>Funciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{ListCompanies}</Table.Body>
        </Table>
        <ModalEdit />
      </Container>
    </div>
  );
};

export default App;
