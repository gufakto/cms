import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'CMS',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'CMS API BASEURL'
        },
    ],
    components: {
        schemas: {
            User: {
                name: "string",
                email:"string",
                password: "string",
                phone: "string"
            },
            UpdateUser: {
                name: "string",
                email: "string",
                phone: "string"
            },
            Auth: {
                email: "string",
                password: "string",
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/createApp.ts'];

swaggerAutogen({openapi: '3.0.0', debug: true})(outputFile, endpointsFiles, doc)
.then(() => {
    console.log('Swagger file successfully generated!');
})
.catch((err) => {
    console.error('Error generating Swagger file:', err);
});
