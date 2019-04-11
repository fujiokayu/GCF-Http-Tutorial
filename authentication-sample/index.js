const Google = require('googleapis');
const BUCKET = 'bucket-for-secure';

function getAccessToken(header) {
    if (header) {
        var match = header.match(/^Bearer\s+([^\s]+)$/);
        if (match) {
            return match[1];
        }
    }

    return null;
}

function authorized(res) {
    res.send("The request was successfully authorized.");
}

/**
 * Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.secureFunction = function secureFunction(req, res) {
    var accessToken = getAccessToken(req.get('Authorization'));
    var oauth = new Google.auth.OAuth2();
    oauth.setCredentials({access_token: accessToken});

    var permission = 'storage.buckets.get';
    var gcs = Google.storage('v1');
    gcs.buckets.testIamPermissions(
        {bucket: BUCKET, permissions: [permission], auth: oauth}, {},
        function (err, response) {
            if (response && response['permissions'] && response['permissions'].includes(permission)) {
                authorized(res);
            } else {
                res.status(403).send(err.toString());
            }
        });
};
