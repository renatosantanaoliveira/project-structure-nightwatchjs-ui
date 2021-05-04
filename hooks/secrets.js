const { setStore } = require("./store");

var AWS = require("aws-sdk"),
    region = "us-east-1",
    secretName = "dev/...";

var client = new AWS.SecretsManager({
    region: region,
});

function getAwsSecret(secretName) {
  return client.getSecretValue({ SecretId: secretName }).promise();
}

async function getAwsSecretAsync() {
  var response = await getAwsSecret(secretName);
  var secretString = response.SecretString;
  var secret = JSON.parse(secretString);
  setStore(secret);
}
module.exports.getAwsSecretAsync = getAwsSecretAsync