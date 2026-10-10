import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Deepika Portfolio REST API',
      version: '1.0.0',
      description: 'Production-ready REST API powering Deepika\'s Full-Stack Developer Portfolio. Built with Node.js, Express, TypeScript, and MongoDB.',
      contact: {
        name: 'Deepika',
        email: 'deepika.dev@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        AdminApiKeyHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'x-admin-key',
          description: 'Administrator secret key for write and admin endpoints',
        },
      },
      schemas: {
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66141a2b9f8a3c001f3e4d5a' },
            title: { type: 'string', example: 'Project Management Dashboard' },
            slug: { type: 'string', example: 'project-management-dashboard' },
            description: { type: 'string', example: 'A task management dashboard for organizing projects and tracking task statuses.' },
            longDescription: { type: 'string', example: 'Detailed full-stack project built with React, Node.js, Express, and MongoDB.' },
            technologies: {
              type: 'array',
              items: { type: 'string' },
              example: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
            },
            category: { type: 'string', example: 'Full Stack' },
            imageUrl: { type: 'string', example: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80' },
            githubUrl: { type: 'string', example: 'https://github.com' },
            liveDemoUrl: { type: 'string', example: 'https://example.com' },
            featured: { type: 'boolean', example: true },
            published: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Skill: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66141a2b9f8a3c001f3e4d5b' },
            name: { type: 'string', example: 'React.js' },
            category: { type: 'string', example: 'Frontend Development' },
            icon: { type: 'string', example: 'Code' },
            sortOrder: { type: 'number', example: 1 },
          },
        },
        Education: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66141a2b9f8a3c001f3e4d5c' },
            degree: { type: 'string', example: 'B.Tech in Information Technology' },
            institution: { type: 'string', example: 'University College of Engineering' },
            department: { type: 'string', example: 'Information Technology' },
            startYear: { type: 'string', example: '2022' },
            endYear: { type: 'string', example: '2026' },
            description: { type: 'string', example: 'Core coursework in Data Structures, Web Development, DBMS, and OS.' },
          },
        },
        Certification: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66141a2b9f8a3c001f3e4d5d' },
            title: { type: 'string', example: 'Full-Stack Web Development Specialization' },
            issuer: { type: 'string', example: 'Coursera / Meta' },
            completionDate: { type: 'string', example: '2024' },
            credentialUrl: { type: 'string', example: 'https://coursera.org/verify/example' },
          },
        },
        ContactMessage: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', example: 'jane@example.com' },
            subject: { type: 'string', example: 'Project Collaboration Query' },
            message: { type: 'string', example: 'Hi Deepika, I reviewed your portfolio and would love to discuss a developer opportunity.' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Error message description' },
          },
        },
      },
    },
    paths: {
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'Check server and database connectivity status',
          responses: {
            200: { description: 'Server and DB health state' },
          },
        },
      },
      '/projects': {
        get: {
          tags: ['Projects'],
          summary: 'Get published portfolio projects',
          parameters: [
            { in: 'query', name: 'category', schema: { type: 'string' }, description: 'Filter projects by category' },
            { in: 'query', name: 'featured', schema: { type: 'boolean' }, description: 'Filter only featured projects' },
          ],
          responses: {
            200: { description: 'List of projects' },
          },
        },
        post: {
          tags: ['Projects'],
          summary: 'Create a new portfolio project (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Project' },
              },
            },
          },
          responses: {
            201: { description: 'Project created' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/projects/{id}': {
        get: {
          tags: ['Projects'],
          summary: 'Get project details by ObjectId',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Project details' },
            404: { description: 'Project not found' },
          },
        },
        put: {
          tags: ['Projects'],
          summary: 'Update project (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Project' },
              },
            },
          },
          responses: {
            200: { description: 'Project updated' },
            401: { description: 'Unauthorized' },
          },
        },
        delete: {
          tags: ['Projects'],
          summary: 'Delete project (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Project deleted' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/skills': {
        get: {
          tags: ['Skills'],
          summary: 'Get all categorized skills',
          responses: {
            200: { description: 'List of skills' },
          },
        },
        post: {
          tags: ['Skills'],
          summary: 'Add a new skill (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Skill' } },
            },
          },
          responses: {
            201: { description: 'Skill created' },
          },
        },
      },
      '/education': {
        get: {
          tags: ['Education'],
          summary: 'Get education timeline entries',
          responses: { 200: { description: 'List of education entries' } },
        },
        post: {
          tags: ['Education'],
          summary: 'Add an education entry (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Education' } },
            },
          },
          responses: { 201: { description: 'Education entry created' } },
        },
      },
      '/certifications': {
        get: {
          tags: ['Certifications'],
          summary: 'Get certifications',
          responses: { 200: { description: 'List of certifications' } },
        },
        post: {
          tags: ['Certifications'],
          summary: 'Add certification (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Certification' } },
            },
          },
          responses: { 201: { description: 'Certification created' } },
        },
      },
      '/contact': {
        post: {
          tags: ['Contact'],
          summary: 'Submit a contact form message (Validated & Rate Limited)',
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ContactMessage' } },
            },
          },
          responses: {
            201: { description: 'Message saved to database' },
            400: { description: 'Validation error' },
            429: { description: 'Rate limit exceeded' },
          },
        },
        get: {
          tags: ['Contact'],
          summary: 'Retrieve submitted contact messages (Admin only)',
          security: [{ AdminApiKeyHeader: [] }],
          responses: {
            200: { description: 'List of contact messages' },
            401: { description: 'Unauthorized' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
