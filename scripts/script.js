const root = document.querySelector('#root');

const images = [
  'https://www.vinterier.ru/pictures/shop/krasivyiy-peiyzag-kartina-maslom-40x30.jpg',
  'https://kartin.papik.pro/uploads/posts/2023-07/thumbs/1688461053_kartin-papik-pro-p-kartinki-priroda-leto-krasivie-v-khoroshem-56.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJAzu5aTrvg0yPTkww7slPkkHuIjxHKsxRnF6YOnvsQ&s=10',
  'https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400',
];
function createSlider(root, images) {
  const STEP_WIDTH = 500;
  let sliderIndex = 0;
  const roundButtons = [];

  // элементы
  const frame = document.createElement('div');
  const cards = document.createElement('div');
  const triggers = document.createElement('div');
  const leftBtn = document.createElement('button');
  const rightBtn = document.createElement('button');

  frame.className = 'frame';
  cards.className = 'cards';
  triggers.className = 'triggers';

  triggers.append(leftBtn, rightBtn);
  frame.append(cards, triggers);
  root.append(frame);

  // обновление положения слайдера и активной точки
  function updateSlider() {
    cards.style.left = `${-STEP_WIDTH * sliderIndex}px`;

    roundButtons.forEach((btn, index) => {
      btn.classList.toggle('active', index === sliderIndex);
    });
  }

  // точки-индикаторы
  function createRounds() {
    const container = document.createElement('div');
    container.className = 'rounds';
    frame.append(container);

    images.forEach((_, i) => {
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        sliderIndex = i;
        updateSlider();
      });
      container.append(button);
      roundButtons.push(button);
    });
  }

  // карточки
  images.forEach((image) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url("${image}")`;
    cards.append(card);
  });

  // переключение стрелками
  const move = (step) => {
    const next = sliderIndex + step;
    if (next >= 0 && next < images.length) {
      sliderIndex = next;
      updateSlider();
    }
  };

  leftBtn.addEventListener('click', () => move(-1));
  rightBtn.addEventListener('click', () => move(1));

  createRounds();
  updateSlider();
}

createSlider(document.querySelector('#root'), images);
