window.addEventListener('DOMContentLoaded', ()=> {
  // コンテナを指定
  const container = document.querySelector('.leaves-container');

  // 葉っぱを生成する関数
  const createLeaf = (leafClass, minSizeVal, maxSizeVal) => {
    const leafEl = document.createElement('span');
    leafEl.className = `leaf ${leafClass}`;
    const minSize = minSizeVal;
    const maxSize = maxSizeVal;
    const size = Math.random() * (maxSize + 1 - minSize) + minSize;
    leafEl.style.width = `${size}px`;
    leafEl.style.height = `${size}px`;
    leafEl.style.left = Math.random() * 100 + '%';
    container.appendChild(leafEl);

    // 一定時間が経てば葉っぱを消す
    setTimeout(() => {
      leafEl.remove();
    }, 8000);
  }

  // 葉っぱを生成する間隔をミリ秒で指定する
  // createLeafの引数には、'クラス名', '最小サイズ', '最大サイズ'を渡す
  setInterval(createLeaf.bind(this, 'leaf-1', 30, 60), 2000);
  setInterval(createLeaf.bind(this, 'leaf-2', 30, 60), 3000);
  setInterval(createLeaf.bind(this, 'leaf-3', 30, 60), 4000);
});