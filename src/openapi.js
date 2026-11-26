const Todo = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    title: { type: 'string', example: 'Buy milk' },
    completed: { type: 'boolean', example: false },
    created_at: { type: 'string', format: 'date-time' },
  },
};

export default {
  openapi: '3.0.3',
  info: { title: 'Todos API', version: '1.0.0', description: 'Simple todos demo API' },
  paths: {
    '/api/todos': {
      get: {
        summary: 'List todos',
        responses: {
          200: { description: 'List of todos', content: { 'application/json': { schema: { type: 'array', items: Todo } } } },
        },
      },
      post: {
        summary: 'Add a todo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', required: ['title'], properties: { title: { type: 'string', example: 'Learn Railway' } } },
            },
          },
        },
        responses: {
          201: { description: 'Created todo', content: { 'application/json': { schema: Todo } } },
          400: { description: 'Title is required' },
        },
      },
    },
    '/api/todos/{id}': {
      delete: {
        summary: 'Remove a todo',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          204: { description: 'Deleted' },
          404: { description: 'Todo not found' },
        },
      },
    },
  },
};
