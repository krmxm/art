const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showElems(block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
            item.style.display = 'none';
        });
    }

    function hideElems(block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
            item.style.display = 'block';
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showElems(block);
        });
        block.addEventListener('mouseout', () => {
            hideElems(block);
        });
    });
};

export default pictureSize;