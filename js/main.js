// DOM（HTML）の読み込みが完了したら実行する
document.addEventListener("DOMContentLoaded", function() {
    
    // ヘッダーを読み込んで挿入する
    fetch('common/header.html')
        .then(response => response.text()) // 読み込んだファイルをテキストとして扱う
        .then(data => {
            // id="header-placeholder" の要素に、読み込んだHTML(data)を挿入
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // フッターを読み込んで挿入する
    fetch('common/footer.html')
        .then(response => response.text())
        .then(data => {
            // id="footer-placeholder" の要素に、読み込んだHTML(data)を挿入
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});