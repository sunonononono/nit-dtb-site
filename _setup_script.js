// Node.jsの標準機能（モジュール）を読み込みます
const fs = require('fs'); // fs = File System (ファイルを操作する機能)
const path = require('path'); // path = パス（フォルダ階層）を正しく扱う機能

// ---------------------------------------------
// 1. 設計図となるJSONファイルを読み込む
// ---------------------------------------------
const listFilePath = path.join(__dirname, 'data', 'animal-list.json');
let animalList;

try {
    const fileContent = fs.readFileSync(listFilePath, 'utf8');
    animalList = JSON.parse(fileContent);
} catch (error) {
    console.error(`Error: data/animal-list.json が読み込めません。`);
    console.error('先に data/animal-list.json に40種類のどうぶつを登録してください。');
    process.exit(1); // エラーでスクリプトを終了
}

console.log(`... ${animalList.length} 件のどうぶつ情報を読み込みました ...`);

// ---------------------------------------------
// 2. 詳細JSONファイルのひな形（テンプレート）
// ---------------------------------------------
// animal-list.json の情報を使って、各詳細JSONの「初期状態」を定義します
const createJsonTemplate = (animal) => {
    return {
        "id": animal.id,
        "name": animal.name,
        "image": animal.image.replace('/thumb.png', '/full.png'), // サムネをフル画像パスに仮置き
        "description": `${animal.name} の解説をここに入力します。`,
        "static_placements": [
            {
                "direction": "右向き (0度)",
                "advice": "安定している。",
                "angle": 0,
                "screenshots": []
            },
            {
                "direction": "左向き (180度)",
                "advice": "攻め手として強い。",
                "angle": 180,
                "screenshots": []
            }
        ],
        "interactive_placements": [] // 将来のインタラクティブ機能用
    };
};

// ---------------------------------------------
// 3. ループ処理でファイルとフォルダを自動生成
// ---------------------------------------------
let createdFolders = 0;
let createdFiles = 0;

animalList.forEach(animal => {
    const animalId = animal.id;

    // --- (A) 画像フォルダの作成 ---
    const imageFolderPath = path.join(__dirname, 'images', 'animals', animalId);

    // フォルダが「まだ存在しない」場合だけ作成する
    if (!fs.existsSync(imageFolderPath)) {
        fs.mkdirSync(imageFolderPath, { recursive: true });
        console.log(`✅ [フォルダ作成] images/animals/${animalId}/`);
        createdFolders++;
    }

    // --- (B) 詳細JSONファイルの作成 ---
    const jsonFilePath = path.join(__dirname, 'data', 'animals', `${animalId}.json`);

    // JSONファイルが「まだ存在しない」場合だけ作成する
    if (!fs.existsSync(jsonFilePath)) {
        const template = createJsonTemplate(animal); // ひな形を作成
        const jsonContent = JSON.stringify(template, null, 2); // 読みやすく整形して文字列に

        fs.writeFileSync(jsonFilePath, jsonContent, 'utf8');
        console.log(`✅ [JSON作成] data/animals/${animalId}.json`);
        createdFiles++;
    }
});

console.log('\n--- 完了 ---');
console.log(`フォルダを ${createdFolders} 件、JSONファイルを ${createdFiles} 件、新規作成しました。`);
console.log('（すでに存在していたものはスキップしました）');