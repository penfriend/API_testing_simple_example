const { expect } = require('chai');
const axios = require('axios');
const env = require('../endpoint/gists.json');
const yargs = require('yargs').argv;

const status_code_success_ok = 200;
const status_code_success_created = 201;
const status_code_success_no_content = 204;
const token = yargs.token || "bd631d5353c707a538d81c373fcdac28356c1f9e";
const config = {
    headers: { Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json' }
};

const bodyParameters = {
    'description': 'Names',
    'public': true,
    'files': {
        'names.txt': {
            'content': 'Names list...'
        }
    }
};

describe('Gists', () => {
    let responsePostId;
    let response;
    before('post', async () => {
        response = await axios.post( 
            env.uri,
            bodyParameters,
            config
        ).then(response => response);
        responsePostId = await response.data.id;
    });
    it('post', async () => {
        expect(await response.status).eql(status_code_success_created);
    })
    it('patch', async () => {
        const patchBodyFiles = Object.assign({
            'description':bodyParameters.description },
            { 'files':bodyParameters.files });
        patchBodyFiles.files['names.txt'].config = 'Patch Names list...'
        const responseStatus = await axios.patch( 
            env.uri+'/'+responsePostId,
            patchBodyFiles,
            config
        ).then(response => response.status);
        expect(await responseStatus).eql(status_code_success_ok);
    });

    it('delete', async () => {
        const responseStatus = await axios.delete( 
            env.uri+'/'+responsePostId,
            config
        ).then(response => response.status);
        expect(await responseStatus).eql(status_code_success_no_content);
    });
});
