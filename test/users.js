const { expect } = require('chai');
const axios = require('axios');
const env = require('../endpoint/users.json');

const status_code_success_ok = 200;
const content_type_title = 'content-type';
const content_type_value = 'application/json; charset=utf-8';
const response_body_content_length = 10;

describe('Users', () => {

    it('response status', async () => {
        expect((await axios.get(env.uri)).status).eql(status_code_success_ok);
    });

    it('response header', async () => {
        const headers = (await axios.get(env.uri)).headers
        expect(headers.hasOwnProperty(content_type_title)).to.be.true;
        expect(headers[content_type_title]).eql(content_type_value);
    });

    it('response body', async () => {
        expect(((await axios.get(env.uri)).data).length).eql(response_body_content_length);
    });
});