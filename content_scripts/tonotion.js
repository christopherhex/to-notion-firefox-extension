function extractKindleBooks() {
    const coverEl = document.getElementById('cover');
    const resArr = [];

    for (let i = 0; i < coverEl.children.length; i++) {

        const pTags = coverEl.children[i].getElementsByTagName("p");
        const imgTags = coverEl.children[i].getElementsByTagName("img");

        if (pTags.length == 2) {
            resArr.push({
                name: pTags[0].innerHTML.replaceAll(",", " "),
                author: pTags[1].innerHTML.replaceAll(",", " "),
                imageLink: imgTags[0].src
            })
        }
    }

    return resArr;
}

// Receive data from the extension
browser.runtime.onMessage.addListener(data => {
    console.log('Received Data');
    if (data.command === 'fetch') {
        const books = extractKindleBooks();

        let resStr = "title,author,imageLink\r\n";

        for (let i = 0; i < books.length; i++) {
            resStr += `${books[i].name},${books[i].author},${books[i].imageLink}\r\n`;
        };

        var downloadLink = document.createElement("a");
        downloadLink.href = encodeURI("data:text/csv;charset=utf-8," + resStr);
        downloadLink.download = "books.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        return Promise.resolve({ data: books });
    }
})

