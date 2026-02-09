const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    try {
        if (event.httpMethod === "GET") {
            const data = await dynamodb.send(new GetCommand({
                TableName: TABLE_NAME,
                Key: { id: "counter" }
            }));

            return {
                statusCode: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify(data.Item || { id: "counter", value: 0 })
            };
        }

        if (event.httpMethod === "PUT") {
            const data = await dynamodb.send(new UpdateCommand({
                TableName: TABLE_NAME,
                Key: { id: "counter" },
                UpdateExpression: "SET #v = if_not_exists(#v, :zero) + :inc",
                ExpressionAttributeNames: { "#v": "value" },
                ExpressionAttributeValues: {
                    ":inc": 1,
                    ":zero": 0
                },
                ReturnValues: "UPDATED_NEW"
            }));

            return {
                statusCode: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify(data.Attributes)
            };
        }

        return { statusCode: 400, body: "Unsupported method" };
    } catch (err) {
        return { statusCode: 500, body: err.message };
    }
};