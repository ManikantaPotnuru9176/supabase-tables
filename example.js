/* 
1. user will create a table from cql admin panel with his respective colums and their dataypes, these data types are not the traditional database datatypes, but a custom datatypes provided by CQL. ex: string, rte, boolean, integer, date
2. We save this data in our Zustand in the following format.

metadata => tableId, jsonb => user's column data
we should know the metadataID => (Also, store in userData)

  table: {
    name: "todo",
    schema: [{name: "task", type: "rte"}, {name: "completed", type: "boolean"}]
  }

  Create Table:
  url: http://127.0.0.1:54323/api/pg-meta/default/tables
  body: {
    name: "todo",
    schema: "public",
    comment: "test description",
    rls_enabled: true
  }

  Create Columns:
  url: http://127.0.0.1:54323/api/pg-meta/default/columns
  body: {
    tableId: 25255,
    isIdentity: true,
    name: "id",
    type: "int8",
    isUnique: false,
    isPrimaryKey: false
  }

  1. As the name of the table is todo, we first create the todo table and the ID of it
  2. we will create respective colums based on the number of attributes in supabase


METADATA Table
| id  | table_id  | schema  |
|---|---|---|
|  1 |  1wrwr3 |  [{name: "task", type: "rte"}, {name: "completed", type: "boolean"}] |
|  2 |   |   |
|   |   |   |

{
  rte: "varchar"
}


1. use cql admin panel to create user's required table schema and save it in Zustand
2. create the respective table using supabase api end point
3. now save the table_id and zustand saved schema in the metadata tabel using a CRUD operation
4. Create all other respective schema's as columns via supabase api end point
*/
