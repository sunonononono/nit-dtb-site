document.addEventListener("DOMContentLoaded", function() {
    
    // 1. 3つのカテゴリすべてのコンテナ要素を取得
    const largeContainer = document.getElementById('large-animal-container');
    const mediumContainer = document.getElementById('medium-animal-container');
    const smallContainer = document.getElementById('small-animal-container');

    // コンテナが見つからない場合のエラーチェック
    if (!largeContainer || !mediumContainer || !smallContainer) {
        console.error("カテゴリコンテナが見つかりません。HTMLのidを確認してください。");
        return;
    }

    // 「概要リスト」のJSONをfetch（取得）する
    fetch('data/animal-list.json')
        .then(response => response.json()) // JSONとして解析
        .then(animalList => {
            
            // 取得したデータ（配列）をループ処理
            animalList.forEach(animal => {
                
                // 2. どうぶつのリンク要素を作成（ここは前回とほぼ同じ）
                const linkElement = document.createElement('a');
                linkElement.href = `animal.html?id=${animal.id}`;
                linkElement.className = 'animal-link-item'; // CSS用にクラス名を設定

                // 画像(img)を作成
                const imgElement = document.createElement('img');
                imgElement.src = animal.image;
                imgElement.alt = animal.name;
                linkElement.appendChild(imgElement);
                
                // 名前(p)を作成
                const nameElement = document.createElement('p');
                nameElement.textContent = animal.name;
                linkElement.appendChild(nameElement);

                
                // 3. ★★★分類（category）に応じて、挿入するコンテナを決定する★★★
                switch (animal.category) {
                    case 'large':
                        largeContainer.appendChild(linkElement);
                        break;
                    case 'medium':
                        mediumContainer.appendChild(linkElement);
                        break;
                    case 'small':
                        smallContainer.appendChild(linkElement);
                        break;
                }
            });
        })
        .catch(error => {
            // エラーハンドリング
            console.error('一覧の読み込みに失敗しました:', error);
            // すべてのコンテナにエラーメッセージを表示
            [largeContainer, mediumContainer, smallContainer].forEach(container => {
                if(container) container.textContent = '一覧の読み込みに失敗しました。';
            });
        });
});