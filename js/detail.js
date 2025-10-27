document.addEventListener("DOMContentLoaded", function () {

    // 1. URLから「?id=...」の値（クエリパラメータ）を取得する
    const params = new URLSearchParams(window.location.search);
    const animalId = params.get('id'); // 例: "elephant" や "giraffe" が入る

    // 2. 詳細情報を表示するコンテナ要素を取得
    const container = document.getElementById('animal-detail-container');

    // 3. animalIdが正しく取れているかチェック
    if (animalId) {
        // 4. 取得したIDを使って、対応する詳細JSONファイルのパスを作成
        const jsonPath = `data/animals/${animalId}.json`; // 例: "data/animals/elephant.json"

        // 5. 詳細JSONをfetchする
        fetch(jsonPath)
            .then(response => {
                // 404エラー（ファイルが見つからない）場合の対処
                if (!response.ok) {
                    throw new Error('指定されたどうぶつの情報が見つかりません。');
                }
                return response.json(); // JSONとして解析
            })
            .then(animalData => {
                // 6. 取得したデータでHTMLを組み立てる
                // どうぶつの名前 (h1)
                const nameElement = document.createElement('h1');
                nameElement.textContent = animalData.name;
                container.appendChild(nameElement);

                // どうぶつの説明 (p)
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = animalData.description;
                container.appendChild(descriptionElement);

                // どうぶつの静的な置き方（static_placements）をループ処理
                const placementsTitle = document.createElement('h2');
                placementsTitle.textContent = '基本的な置き方';
                container.appendChild(placementsTitle);

                const ul = document.createElement('ul');
                animalData.static_placements.forEach(placement => {

                    // 1. ラッパー要素（div）を作成 ★これが場所を確保する
                    const imageWrapper = document.createElement('div');
                    imageWrapper.style.width = '100px';
                    imageWrapper.style.height = '100px';
                    imageWrapper.style.border = '1px solid #ccc';
                    // ★Flexboxを使って、中の画像を中央揃えにする設定
                    imageWrapper.style.display = 'flex';
                    imageWrapper.style.justifyContent = 'center';
                    imageWrapper.style.alignItems = 'center';
                    imageWrapper.style.overflow = 'hidden'; // 回転ではみ出たら隠す

                    imageWrapper.style.backgroundColor = '#ffaaff';

                    // 2. 画像（img）を作成 ★これが回転する
                    const imgElement = document.createElement('img');
                    imgElement.src = animalData.image; // ★キー名を "image" に変更
                    imgElement.alt = `${animalData.name} - ${placement.direction}`;

                    // 3. 画像のサイズ（ラッパーに収まるように）
                    imgElement.style.width = '100%';
                    imgElement.style.height = '100%';
                    imgElement.style.objectFit = 'contain'; // アスペクト比を保って収める

                    // 4. 画像「だけ」を回転させる
                    imgElement.style.transform = `rotate(${placement.angle}deg)`;

                    // 5. 解説テキストを作成
                    const textElement = document.createElement('p');
                    textElement.textContent = `【${placement.direction}】: ${placement.advice}`;

                    // 6. 要素を組み立てる
                    // (img を wrapper に入れ、wrapper と text を container に入れる)
                    imageWrapper.appendChild(imgElement); // ラッパーに画像を入れる
                    container.appendChild(imageWrapper);  // コンテナにラッパーを入れる
                    container.appendChild(textElement); // コンテナに解説を入れる

                    // 7. スクリーンショット配列(screenshots)が存在し、中身(length > 0)があるかチェック
                    if (placement.screenshots && placement.screenshots.length > 0) {

                        // 8. 「実践例:」という小見出しを作成・追加
                        const scshTitle = document.createElement('p');
                        scshTitle.textContent = '実践例:';
                        scshTitle.style.fontWeight = 'bold';
                        scshTitle.style.marginTop = '10px';
                        container.appendChild(scshTitle);

                        // 9. ScSh画像を「横並び」にするためのコンテナ(div)を作成
                        const screenshotsContainer = document.createElement('div');
                        screenshotsContainer.style.display = 'flex'; // これで横並びになる
                        screenshotsContainer.style.flexWrap = 'wrap'; // 画面幅で折り返す
                        screenshotsContainer.style.gap = '5px';       // 画像間の隙間

                        // 10. ScSh配列をループ処理
                        placement.screenshots.forEach(scshPath => {
                            // 11. ScSh用の<img>タグを作成
                            const scshImg = document.createElement('img');
                            scshImg.src = scshPath;
                            scshImg.alt = "実践例スクリーンショット";

                            // 12. ScSh画像の仮サイズ（お好みで調整してください）
                            scshImg.style.width = '200px';
                            scshImg.style.height = 'auto'; // 高さは自動
                            scshImg.style.border = '1px solid #999';

                            // 13. ScShコンテナにScSh画像を追加
                            screenshotsContainer.appendChild(scshImg);
                        });

                        // 14. ScShコンテナをメインのコンテナに追加
                        container.appendChild(screenshotsContainer);
                    }

                    // 15. 各「向き」ごとの区切り線を追加（見やすさのため）
                    const divider = document.createElement('hr');
                    divider.style.border = 'none';
                    divider.style.borderTop = '1px dashed #ccc';
                    divider.style.marginTop = '20px';
                    divider.style.marginBottom = '20px';
                    container.appendChild(divider);
                });
                container.appendChild(ul);

                // ★ここに将来、インタラクティブな回転機能を追加していく

            })
            .catch(error => {
                // 7. エラーハンドリング
                console.error('詳細データの読み込みに失敗しました:', error);
                container.innerHTML = `<p>${error.message}</p>`;
            });

    } else {
        // IDがURLに指定されていなかった場合
        container.innerHTML = '<p>表示するどうぶつが指定されていません。</p>';
    }
});