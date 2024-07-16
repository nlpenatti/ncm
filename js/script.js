document.getElementById('xmlInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const invalidItem = document.getElementById('invalidItemInput').value;
    
    // Função para exibir o conteúdo principal após o countdown
    function showMainContent() {
        setTimeout(function () {
            document.getElementById('loadingModal').classList.add('hidden');
            document.querySelector('.main-content').classList.remove('hidden');
            document.getElementById('clearXmlDataButtonIcon').classList.remove('hidden');
        }, 2000);
    }

    if (file) {
        const reader = new FileReader();
        reader.onloadstart = function () {
            document.getElementById('loadingModal').classList.remove('hidden');
            document.getElementById('clearXmlDataButtonIcon').classList.add('hidden'); // Esconde o botão com ícone ao carregar novo XML
        };
        reader.onload = function (e) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(e.target.result, "text/xml");
            const items = xmlDoc.getElementsByTagName('det');
            const tableBody = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

            for (let item of items) {
                const nItem = item.getAttribute('nItem');
                const cProd = item.getElementsByTagName('cProd')[0].textContent;
                const xProd = item.getElementsByTagName('xProd')[0].textContent;
                const ncm = item.getElementsByTagName('NCM')[0].textContent;
                const cfop = item.getElementsByTagName('CFOP')[0].textContent;
                const qCom = item.getElementsByTagName('qCom')[0].textContent;
                const vUnCom = item.getElementsByTagName('vUnCom')[0].textContent;
                const vProd = item.getElementsByTagName('vProd')[0].textContent;

                const row = document.createElement('tr');
                if (invalidItem && nItem === invalidItem) {
                    row.classList.add('invalid-item');
                }

                row.innerHTML = `
                    <td>${nItem}</td>
                    <td>${cProd}</td>
                    <td>${xProd}</td>
                    <td>${ncm}</td>
                    <td>${cfop}</td>
                    <td>${qCom}</td>
                    <td>${vUnCom}</td>
                    <td>${vProd}</td>
                `;
                tableBody.appendChild(row);
            }

            // Exibe o conteúdo principal após o countdown
            showMainContent();
        };
        reader.readAsText(file);
    } else {
        // Se nenhum arquivo for selecionado, apenas exibe o conteúdo principal após o countdown
        showMainContent();
    }
});

// Função para limpar as informações do XML
function clearXmlData() {
    document.getElementById('itemsTable').getElementsByTagName('tbody')[0].innerHTML = '';
    document.getElementById('invalidItemInput').value = '';
    document.querySelector('.main-content').classList.add('hidden');
    document.getElementById('loadingModal').classList.add('hidden');
    document.getElementById('clearXmlDataButtonIcon').classList.add('hidden'); // Esconde o botão com ícone ao limpar o XML
}

// Adiciona evento de clique ao botão de limpar
document.getElementById('clearXmlDataButton').addEventListener('click', function () {
    clearXmlData();
});
