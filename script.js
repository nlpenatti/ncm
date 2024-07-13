document.getElementById('xmlInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const invalidItem = document.getElementById('invalidItemInput').value;
    if (file) {
        const reader = new FileReader();
        reader.onloadstart = function() {
            document.getElementById('loadingModal').classList.remove('hidden');
        };
        reader.onload = function(e) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(e.target.result, "text/xml");
            const items = xmlDoc.getElementsByTagName('det');
            const tableBody = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Limpa a tabela antes de inserir novos dados

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

            // Adiciona um atraso artificial de 2 segundos antes de esconder o modal de carregamento
            setTimeout(function() {
                document.getElementById('loadingModal').classList.add('hidden');
                document.querySelector('.main-content').classList.remove('hidden');  // Exibe o conteúdo principal
            }, 2000);
        };
        reader.readAsText(file);
    }
});
