import React, { useEffect } from "react"
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { randomId } from "@mui/x-data-grid-generator";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, matricula: '', nome: '', senha: '', tipo: '', situacao: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'matricula' }, // Define o campo a ser focado
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Novo Registro
      </Button>
    </GridToolbarContainer>
  );
}


const Cadastro: React.FC = () => {

  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/usuarios');
        if (response.ok) {
          const data = await response.json();
          console.log('data', data.usuarios);

          // Supondo que os dados retornados sejam um array de objetos compatível com as colunas definidas
          setRows(Array.isArray(data.usuarios) ? data.usuarios : [])
        } else {
          console.error('Erro ao buscar os dados:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchData();
  }, []);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row._id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) => prevRows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    if (updatedRow) {
      // Verifique se todos os campos obrigatórios foram preenchidos
      if (!newRow.matricula || !newRow.nome || !newRow.senha || !newRow.tipo || !newRow.situacao) {
        console.error('Preencha todos os campos obrigatórios antes de salvar.');
        alert('Preencha todos os campos antes de salvar.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (response.status === 201) {
          alert('Registro salvo com sucesso')
          console.log('Registro salvo com sucesso');
        } else {
          console.error('Erro ao salvar o registro', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'matricula', headerName: 'Matricula', type: 'number', width: 150, align: 'center',
      headerAlign: 'center', editable: true
    },
    {
      field: 'nome',
      headerName: 'Nome',
      type: 'string',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'senha',
      headerName: 'Senha',
      type: 'string',
      width: 150,
      editable: true,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Aluno', 'Professor', 'Desenvolvedor'],
    },
    {
      field: 'situacao',
      headerName: 'Situação',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Ativo', 'Inativo'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Salvar"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textSecundary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Deletar"
            className="textPrimary"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 550,
        backgroundColor: 'white',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'red',
        },
        '& .textSecundary': {
          color: 'black'
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        getRowId={(row) => row.id || row._id}
      />
    </Box>
  );
}

export default Cadastro
