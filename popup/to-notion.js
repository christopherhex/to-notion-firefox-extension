document.getElementById('content').innerHTML = "#Books"

const buttonCsv = document.getElementById('extractCSVButton');

function handleResponse(data) {
    document.getElementById('content').innerHTML = `Data: ${data.data.length}`
}


buttonCsv.addEventListener("click", async (ev) => {
    document.getElementById('content').innerHTML = "Waiting"
    const currentTabs = await browser.tabs.query({ currentWindow: true, active: true });

    var sending = browser.tabs.sendMessage(currentTabs[0].id, {
        command: "fetch"
    });
    sending.then(handleResponse);
});