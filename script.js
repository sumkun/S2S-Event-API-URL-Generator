function toggleCreatedAtFields() {
    const selectedValue = document.getElementById('createdAtSelect').value;
    const createdAtGroup = document.getElementById('createdAtGroup');
    const createdAtUnixGroup = document.getElementById('createdAtUnixGroup');
    if (selectedValue === 'created_at') {
        createdAtGroup.style.display = 'block';
        createdAtUnixGroup.style.display = 'none';
    } else {
        createdAtGroup.style.display = 'none';
        createdAtUnixGroup.style.display = 'block';
    }
}

function encodeValue(value) {
    return encodeURIComponent(value);
}

function generateCommands() {
    // Get the form values
    const appToken = document.getElementById('appToken').value;
    const eventToken = document.getElementById('eventToken').value;
    const deviceIdType = document.getElementById('deviceIdType').value;
    const deviceIdValue = document.getElementById('deviceIdValue').value;
    const adid = document.getElementById('adid').value;
    const ipAddress = document.getElementById('ipAddress').value;
    const createdAt = document.getElementById('createdAt').value;
    const createdAtUnix = document.getElementById('createdAtUnix').value;
    const callbackParams = document.getElementById('callbackParams').value;
    const partnerParams = document.getElementById('partnerParams').value;
    const revenue = document.getElementById('revenue').value;
    const currency = document.getElementById('currency').value;
    const environment = document.getElementById('environment').value;

    // Determine the created_at parameter based on the selected format
    let createdAtParam = '';
    if (document.getElementById('createdAtSelect').value === 'created_at') {
        createdAtParam = createdAt ? `&created_at=${encodeValue(createdAt)}` : '';
    } else {
        createdAtParam = createdAtUnix ? `&created_at_unix=${encodeValue(createdAtUnix)}` : '';
    }

    // Construct the base API URL
    let apiUrl = `https://s2s.adjust.com/event?s2s=1&event_token=${encodeValue(eventToken)}&app_token=${encodeValue(appToken)}`;

    // Add the selected device ID type and value to the URL
    if (deviceIdType && deviceIdValue) {
        apiUrl += `&${encodeValue(deviceIdType)}=${encodeValue(deviceIdValue)}`;
    }

    // Add optional parameters to the URL
    if (adid) apiUrl += `&adid=${encodeValue(adid)}`;
    if (ipAddress) apiUrl += `&ip_address=${encodeValue(ipAddress)}`;
    if (callbackParams) apiUrl += `&callback_params=${encodeValue(callbackParams)}`;
    if (partnerParams) apiUrl += `&partner_params=${encodeValue(partnerParams)}`;
    if (revenue) apiUrl += `&revenue=${encodeValue(revenue)}`;
    if (currency) apiUrl += `&currency=${encodeValue(currency)}`;
    if (environment) apiUrl += `&environment=${encodeValue(environment)}`;

    // Append the created_at parameter
    apiUrl += createdAtParam;

    // Construct the Curl command
    const curlCommand = `curl --location "${apiUrl}"`;

    // Display the generated URL and Curl command
    document.getElementById('apiUrl').textContent = apiUrl;
    document.getElementById('curlCommand').textContent = curlCommand;
}