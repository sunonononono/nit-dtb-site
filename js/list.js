document.addEventListener("DOMContentLoaded", function() {
    
    // 一覧を表示させるコンテナ要素を取得
    const container = document.getElementById('animal-list-container');
    
    // 「概要リスト」のJSONをfetch（取得）する
    fetch('data/animal-list.json')
        .then(response => response.json()) // テキストではなくJSONとして解析
        .then(animalList => {
            // 取得したデータ（配列）をループ処理
            animalList.forEach(animal => {
                
                // 1. <img> タグ（画像）を作成
                const imgElement = document.createElement('img');
                
                // 2. imgタグの「src」属性（画像の場所）を設定
                imgElement.src = animal.image;
                
                // 3. imgタグの「alt」属性（画像が表示できない時の代替テキスト）を設定
                imgElement.alt = animal.name;
                
                // 4. （おまけ）画像のサイズを仮で指定
                imgElement.style.width = '100px';
                imgElement.style.height = '100px';

                // 5. <a> タグ（リンク）を作成
                const linkElement = document.createElement('a');
                
                // 6. リンク先を設定 (例: animal.html?id=elephant)
                linkElement.href = `animal.html?id=${animal.id}`;

                // 7. リンク(a)の中に、画像(img)を挿入する
                linkElement.appendChild(imgElement);
                
                // 8. （おまけ）名前のテキストも追加する場合
                const nameElement = document.createElement('p');
                nameElement.textContent = animal.name;
                linkElement.appendChild(nameElement);

                // 9. コンテナ要素（親）に、作成したリンク要素（子）を追加
                container.appendChild(linkElement);
            });
        })
        .catch(error => {
            // エラーハンドリング
            console.error('一覧の読み込みに失敗しました:', error);
            container.textContent = '一覧の読み込みに失敗しました。';
        });
});