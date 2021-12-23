pm.test("Check for collectionVariables", function () {
    let vars = ['clientId', 'clientSecret', 'tenantId', 'subscriptionId'];
    vars.forEach(function (item, index, array) {
        console.log(item, index);
        pm.expect(pm.collectionVariables.get(item), item + " variable not set").to.not.be.undefined;
        pm.expect(pm.collectionVariables.get(item), item + " variable not set").to.not.be.empty; 
    });

    if (!pm.collectionVariables.get("bearerToken") || Date.now() > new Date(pm.collectionVariables.get("bearerTokenExpiresOn") * 1000)) {
        pm.sendRequest({
            url: 'https://login.microsoftonline.com/' + pm.collectionVariables.get("tenantId") + '/oauth2/token',
            method: 'POST',
            header: 'Content-Type: application/x-www-form-urlencoded',
            body: {
                mode: 'urlencoded',
                urlencoded: [
                    { key: "grant_type", value: "client_credentials", disabled: false },
                    { key: "client_id", value: pm.collectionVariables.get("clientId"), disabled: false },
                    { key: "client_secret", value: pm.collectionVariables.get("clientSecret"), disabled: false },
                    { key: "resource", value: pm.collectionVariables.get("resource") || "https://management.azure.com/", disabled: false }
                ]
            }
        }, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                let resJson = res.json();
                pm.collectionVariables.set("bearerTokenExpiresOn", resJson.expires_on);
                pm.collectionVariables.set("bearerToken", resJson.access_token);
            }
        });
    }
});